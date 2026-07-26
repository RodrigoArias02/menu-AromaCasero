import { CheckIcon } from "../../../utils/icons.jsx";
import ButtonIcon from "../../buttons/buttonIcon.jsx";


function Total({totalCart,costo,handleWhatsAppClick}) {
  return (
     <section className="relativeClass">
      <div className="total">
        <hr />
        <article>
          <p>
            <span>Subtotal</span>
            <span>${totalCart}</span>
          </p>
          <p>
            <span>Envio</span>
            <span className={costo==0?"green":""}>{costo==0?"Gratis":"$"+costo}</span>
          </p>
        </article>

        <hr />
        <p className="total-p">
          <span>TOTAL</span>
          <span>${totalCart+costo}</span>
        </p>
        <ButtonIcon clase="btnAddCart btnMargin" nombre="CONFIRMAR PEDIDO" onclick={()=>handleWhatsAppClick()} icon={<CheckIcon />} />
      </div>
     </section>
  );
}

export default Total;