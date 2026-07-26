import { supabase } from "../lib/supabase.js";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((product) => ({
    ...product,

    offer: {
      kg: product.offerkg,
      price: product.offerprice,
    },

    unidadesPorKg: product.unidadesporkg,
  }));
}

export async function updateProduct(id, productData) {
  console.log("Actualizando producto:", id);
  console.log("Datos enviados:", productData);

  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error de Supabase:", error);
    throw error;
  }

  return data;
}