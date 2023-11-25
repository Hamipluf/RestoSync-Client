import React from "react";
import { useNavigate } from "react-router-dom";
// Assets
import onboarding1 from "../../assets/onboarding-1.jpg";
import onboarding2 from "../../assets/onboarding-2.png";
import logo_b from "../../assets/RestoSync-logos_black.png";
const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero min-h-screen bg-onboard-2">
        <div className="self-start w-full">
          <img className="w-30 h-28" src={logo_b} alt="logo transparent" />
        </div>
        <div className="hero-content w-full h-full">
          <div className="card w-11/12 glass h-5/6 flex-row-reverse p-4">
            <figure className="m-2">
              <img
                className="h-full object-cover"
                src={onboarding1}
                alt="Two cups with wine 🍷"
              />
            </figure>
            <div className="card-body text-light">
              <h2 className="card-title text-5xl font-bold">
                Bienvenido a RestoSync, nuestro Software de Gestión Gastronómica
              </h2>
              <p className="text-dark text-lg bg-slate-200 rounded-r-lg max-w-fit p-2 opacity-40">
                Sincroniza tu exito culinario
              </p>
              <div className="divider"></div>
              <div className="h-3/5">
                <p>
                  Coordina y controla tu local de gastronomía con RestoSync.
                  Gestiona horarios de personal, carga y analiza facturas,
                  agendar y hacer seguimiento de tareas internas, y controla el
                  stock de mercadería. Todo en un mismo lugar y de manera
                  eficiente.
                </p>
              </div>
              <div className="card-actions justify-start">
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-info btn-wide"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-onboard-3">
        <div className="hero-content h-full flex-row-reverse">
          <div className="w-11/12">
            <img
              src={onboarding2}
              className="object-cover max-h-full rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 justify-items-start">
            <h1 className="text-5xl font-bold justify-self-center m-4 text-light">
              Gestión de Horarios del Personal con Chatbot
            </h1>
            <div className="card bg-neutral w-10/12 shadow-xl m-4 rounded-sm">
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl">
                  Chabot Personalizado
                </h2>
                <p className="text-xl">
                  Nuestro software te permite crear un chatbot personalizado que
                  puede gestionar los horarios, licencias, y horas extras de tu
                  personal.
                </p>
              </div>
            </div>
            <div className="card bg-neutral w-10/12 shadow-xl m-4 rounded-sm">
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl">
                  Automatización de Tareas
                </h2>
                <p className="text-xl">
                  La automatización de tareas libera al personal de tareas
                  administrativas y les permite enfocarse en tareas de mayor
                  valor y mejores resultados.
                </p>
              </div>
            </div>
            <div className="card bg-neutral w-10/12 shadow-xl m-4 rounded-sm">
              <div className="card-body">
                <h2 className="card-title font-bold text-2xl">
                  Reportes Personalizados
                </h2>
                <p className="text-xl">
                  Genera reportes personalizados para seguir el rendimiento del
                  personal y tomar decisiones correctivas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <h1 className="text-5xl font-bold m-4 self-start">
            Carga y Análisis de Facturas
          </h1>
          <div className="grid grid-cols-3 justify-items-center items-stretch gap-x-5 w-full m-4">
            <div className="card glass hover:-translate-y-2 transition-all  duration-75  ">
              <div className="card-body">
                <h2 className="card-title">Carga de Facturas</h2>
                <p>
                  Carga en tu sistema de manera organizada todas las facturas de
                  tus proveedores y maneja todo desde una sola herramienta.
                </p>
              </div>
            </div>
            <div className="card glass hover:-translate-y-2 transition-all  duration-75  ">
              <div className="card-body">
                <h2 className="card-title">Fácil Análisis</h2>
                <p>
                  Analiza tus facturas de manera fácil y simple y obtén mejores
                  negocios con tus proveedores.
                </p>
              </div>
            </div>
            <div className="card glass hover:-translate-y-2 transition-all  duration-75  ">
              <div className="card-body">
                <h2 className="card-title">Confirmación de Pagos</h2>
                <p>
                  Programa tus pagos a proveedores de manera anticipada y
                  controla cuándo los llevas a cabo en un solo lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <h1 className="text-5xl font-bold m-4 self-start">
            Agenda y Seguimiento de Tareas Internas
          </h1>
          <div className="grid grid-cols-3 justify-items-center items-stretch gap-x-5 w-full m-4">
            <div className="card glass">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="car!"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Agenda Digital</h2>
                <p>
                  Organiza y asigna tareas a los miembros de tu equipo. Haz
                  seguimientos y percibe el estado de las tareas en un solo
                  lugar.
                </p>
              </div>
            </div>
            <div className="card glass">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="car!"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Notas y Comentarios</h2>
                <p>
                  No pierdas tus notas o comentarios importantes y mantén el
                  registro organizado para no perder actividades importantes a
                  realizar.
                </p>
              </div>
            </div>
            <div className="card glass">
              <figure>
                <img
                  src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="car!"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Recordatorios y Plazos</h2>
                <p>
                  Configura los plazos de las tareas y recordatorios automáticos
                  para asegurarte que las cosas se hagan a tiempo y de manera
                  correcta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
