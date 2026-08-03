import "./horarioModal.css";

import {
  CalendarIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from "../../utils/icons.jsx";

function HorarioModal() {
  return (
    <div className="clock">

      <div className="section-title">
        <div className="line">
            <span className="circle-line"></span>
        </div>
        <h2>Horarios</h2>
        <div className="line">
            <span className="circle-line"></span>
        </div>
      </div>

      <div className="schedule-card">
        <div className="schedule-icon">
            <CalendarDaysIcon />
         
        </div>

        <div className="schedule-info">
          <span>Lunes a Viernes</span>
          <strong>7:00 - 21:00</strong>
        </div>
      </div>

      <div className="schedule-card">
        <div className="schedule-icon">
           <CalendarIcon />
        </div>

        <div className="schedule-info">
          <span>Sábados y Domingos</span>
          <strong>7:00 - 21:00</strong>
        </div>
      </div>

      <div className="section-title redes">
        <div className="line">
            <span className="circle-line"></span>
        </div>
        <h2>Redes Sociales</h2>
        <div className="line">
            <span className="circle-line"></span>
        </div>
      </div>

      <div className="socials">

        <a href="#">
          <div className="left">
            <i className="fa-brands fa-instagram"></i>
            Instagram
          </div>

          <ArrowRightIcon />
        </a>

        <a href="#">
          <div className="left">
            <i className="fa-brands fa-whatsapp"></i>
            WhatsApp
          </div>

          <ArrowRightIcon />
        </a>

        <a href="#">
          <div className="left">
            <i className="fa-brands fa-facebook"></i>
            Facebook
          </div>

          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

export default HorarioModal;