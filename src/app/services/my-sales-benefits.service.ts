import { SchoolService } from './school/school.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MySalesBenefitsService {

  private academyListBenefits = [
    {
      id: 0,
      name: "No pertenece a ningún nivel",
      min_assistant: 0,
      max_assistant: 0,
      benefits: [],
      other_benefits: []
    },
    {
      id: 1,
      name: "ASOCIADA",
      min_assistant: 1,
      max_assistant: 9,
      benefits: [
        {
          id: 1,
          percentages: 3,
          name: "percentages 3%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 0.5,
          name: "percentages 0-5%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Reconocimiento: Las escuelas asociadas tendran visible su nombre en toda la comunicación, pantallas y trofeos. ",
          apply: false,
          note: "",
        },
        {
          name: "Trofeos: Las Escuelas tendran su nombre en los trofeos que ganens sus integrantes en todas las diferentes categorias, al igual que podran tener los certificados digitales de todas las posiciones que ganaron sus integrantes.  ",
          apply: false,
          note: "",
        },
        {
          name: "Convencion anual de directores de Escuelas: En el marco del WLDC se realizara la convencion anual de Escuelas de baile, donde podran compartir conocimientos y experiencias entre colegas de todas las escuelas de el mundo, con informacion de valor para sus entidades. ",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Solo para le director y un acompanante.",
          apply: false,
          note: "",
        },
        {
          name: "PRUEBA DE ESCENARIO: Las Escuelas Asociadas tendran prioridad y tiempo garantizado para probar la tarima con sus miembros. ",
          apply: false,
          note: "",
        },
        {
          name: "Fotografias:  Fotografias profesionales de sus integrantes tomadas por el WLDC          ",
          apply: false,
          note: "",
        },
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado. ",
          apply: false,
          note: "",
        },
        {
          name: "Tallerista Oficial WLDC: Oportunidad para darce a conocer como tallerista, la escuela definira quien o quienes dictarian estos talleres  dentro de la programacion de talleres del WLDC 2023. El nombre del taller dira el nombre de la escuela que lo dicta y el profesor.  ",
          apply: false,
          note: "",
        },
        {
          name: "Descuento Merchandise:  Descuentos especiales en el merchandise del WLDC",
          apply: false,
          note: "",
        },
        {
          name: "Mini documental: Mini Documental de la Historia de la escuela  y su experiencia en el WLDC 2023, la cuela sera montada en los canales oficiales del WLDC y WLDC TV",
          apply: false,
          note: "",
        },
        {
          name: "Videos: Video profesional de las coreografias de sus equipos  en alta calidad.",
          apply: false,
          note: "",
        },
        {
          name: "Cantidad de Votos: Derecho a mas votos dentro de la asociacion de escuelas del WLDC para las decisiones que se sometan a votacion.",
          apply: false,
          note: "",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC",
          apply: false,
          note: "",
        },
        {
          name: "TALLERES: Talleres  especiales para Coreografos con maestros internacionales",
          apply: true,
          note: "Una Persona",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "Una Persona",
        },
        {
          name: "Area VIP de la competencia ",
          apply: true,
          note: "Una Persona",
        },
        {
          name: "Pool Party VIP",
          apply: true,
          note: "Una Persona",
        },
        {
          name: "CENA SHOW DE GALA para la industria",
          apply: true,
          note: "Una Persona",
        },

      ]
    },
    {
      id: 2,
      name: "BRONCE",
      min_assistant: 10,
      max_assistant: 19,
      benefits: [
        {
          id: 1,
          percentages: 5,
          name: "percentages 5%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 1.5,
          name: "percentages 1.5%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Reconocimiento: Las escuelas asociadas tendran visible su nombre en toda la comunicación, pantallas y trofeos. ",
          apply: false,
          note: "",
        },
        {
          name: "Trofeos: Las Escuelas tendran su nombre en los trofeos que ganens sus integrantes en todas las diferentes categorias, al igual que podran tener los certificados digitales de todas las posiciones que ganaron sus integrantes.  ",
          apply: false,
          note: "",
        },
        {
          name: "Convencion anual de directores de Escuelas: En el marco del WLDC se realizara la convencion anual de Escuelas de baile, donde podran compartir conocimientos y experiencias entre colegas de todas las escuelas de el mundo, con informacion de valor para sus entidades. ",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Solo para le director y un acompanante.",
          apply: false,
          note: "",
        },
        {
          name: "PRUEBA DE ESCENARIO: Las Escuelas Asociadas tendran prioridad y tiempo garantizado para probar la tarima con sus miembros. ",
          apply: false,
          note: "15 min",
        },
        {
          name: "Fotografias:  Fotografias profesionales de sus integrantes tomadas por el WLDC          ",
          apply: false,
          note: "10%",
        },
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado. ",
          apply: false,
          note: "",
        },
        {
          name: "Tallerista Oficial WLDC: Oportunidad para darce a conocer como tallerista, la escuela definira quien o quienes dictarian estos talleres  dentro de la programacion de talleres del WLDC 2023. El nombre del taller dira el nombre de la escuela que lo dicta y el profesor.  ",
          apply: false,
          note: "",
        },
        {
          name: "Descuento Merchandise:  Descuentos especiales en el merchandise del WLDC",
          apply: false,
          note: "",
        },
        {
          name: "Mini documental: Mini Documental de la Historia de la escuela  y su experiencia en el WLDC 2023, la cuela sera montada en los canales oficiales del WLDC y WLDC TV",
          apply: false,
          note: "",
        },
        {
          name: "Videos: Video profesional de las coreografias de sus equipos  en alta calidad.",
          apply: false,
          note: "",
        },
        {
          name: "Cantidad de Votos: Derecho a mas votos dentro de la asociacion de escuelas del WLDC para las decisiones que se sometan a votacion.",
          apply: false,
          note: "1",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC",
          apply: false,
          note: "",
        },
        {
          name: "TALLERES: Talleres  especiales para Coreografos con maestros internacionales",
          apply: true,
          note: "Dos Persona",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "Dos Persona",
        },
        {
          name: "Area VIP de la competencia ",
          apply: true,
          note: "Dos Persona",
        },
        {
          name: "Pool Party VIP",
          apply: true,
          note: "Dos Persona",
        },
        {
          name: "CENA SHOW DE GALA para la industria",
          apply: true,
          note: "Dos Persona",
        },

      ]
    },
    {
      id: 3,
      name: "PLATA",
      min_assistant: 20,
      max_assistant: 29,
      benefits: [
        {
          id: 1,
          percentages: 10,
          name: "percentages 10%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 2,
          name: "percentages 2%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Reconocimiento: Las escuelas asociadas tendran visible su nombre en toda la comunicación, pantallas y trofeos. ",
          apply: false,
          note: "",
        },
        {
          name: "Trofeos: Las Escuelas tendran su nombre en los trofeos que ganens sus integrantes en todas las diferentes categorias, al igual que podran tener los certificados digitales de todas las posiciones que ganaron sus integrantes.  ",
          apply: false,
          note: "",
        },
        {
          name: "Convencion anual de directores de Escuelas: En el marco del WLDC se realizara la convencion anual de Escuelas de baile, donde podran compartir conocimientos y experiencias entre colegas de todas las escuelas de el mundo, con informacion de valor para sus entidades. ",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Solo para le director y un acompanante.",
          apply: false,
          note: "",
        },
        {
          name: "PRUEBA DE ESCENARIO: Las Escuelas Asociadas tendran prioridad y tiempo garantizado para probar la tarima con sus miembros. ",
          apply: false,
          note: "25 min",
        },
        {
          name: "Fotografias:  Fotografias profesionales de sus integrantes tomadas por el WLDC          ",
          apply: false,
          note: "30%",
        },
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado. ",
          apply: false,
          note: "",
        },
        {
          name: "Tallerista Oficial WLDC: Oportunidad para darce a conocer como tallerista, la escuela definira quien o quienes dictarian estos talleres  dentro de la programacion de talleres del WLDC 2023. El nombre del taller dira el nombre de la escuela que lo dicta y el profesor.  ",
          apply: false,
          note: "1 taller",
        },
        {
          name: "Descuento Merchandise:  Descuentos especiales en el merchandise del WLDC",
          apply: false,
          note: "10%",
        },
        {
          name: "Mini documental: Mini Documental de la Historia de la escuela  y su experiencia en el WLDC 2023, la cuela sera montada en los canales oficiales del WLDC y WLDC TV",
          apply: false,
          note: "",
        },
        {
          name: "Videos: Video profesional de las coreografias de sus equipos  en alta calidad.",
          apply: false,
          note: "",
        },
        {
          name: "Cantidad de Votos: Derecho a mas votos dentro de la asociacion de escuelas del WLDC para las decisiones que se sometan a votacion.",
          apply: false,
          note: "1",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC",
          apply: false,
          note: "",
        },
        {
          name: "TALLERES: Talleres  especiales para Coreografos con maestros internacionales",
          apply: true,
          note: "Cuatro Persona",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "Cuatro Persona",
        },
        {
          name: "Area VIP de la competencia ",
          apply: true,
          note: "Cuatro Persona",
        },
        {
          name: "Pool Party VIP",
          apply: true,
          note: "Cuatro Persona",
        },
        {
          name: "CENA SHOW DE GALA para la industria",
          apply: true,
          note: "Tres Persona",
        },

      ]
    },
  ]

  private ambassadorsListBenefits = [
    {
      id: 0,
      name: "No pertenece a ningún nivel",
      min_assistant: 0,
      max_assistant: 9,
      benefits: [],
      other_benefits: []
    },
    {
      id: 1,
      name: "BRONCE",
      min_assistant: 10,
      max_assistant: 19,
      benefits: [
        {
          id: 1,
          percentages: 5,
          name: "percentages 5%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 1.5,
          name: "percentages 1.5%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas VIP del Publico: Durante los eventos tendremos unas areas VIP en la parte de adelante donde los embajadores tendran acceso garantizado. solo para el Embajador",
          apply: false,
          note: "",
        },
        {
          name: "Embajador Oficial WLDC: Colaboraciones mutuas en nuestras redes sociales con las de los embajadores. Informacion en la pagina web como embajador oficial.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Beneficio solo para le embajador.",
          apply: false,
          note: "",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC ",
          apply: false,
          note: "",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "EL EMBAJADOR",
        },
        {
          name: "Area VIP de la competencia",
          apply: true,
          note: "EL EMBAJADOR",
        },
        {
          name: "CENA SHOW  DE GALA para la industria",
          apply: true,
          note: "EL EMBAJADOR",
        },
        {
          name: "Hotel Oficial : Hotel LAS AMERICAS, sede oficial del evento por dos noches con desayuno incluido, checkin Viernes 9 y checkout Domingo 11",
          apply: false,
          note: "",
        }

      ]
    },
    {
      id: 2,
      name: "PLATA",
      min_assistant: 20,
      max_assistant: 29,
      benefits: [
        {
          id: 1,
          percentages: 10,
          name: "percentages 10%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 2,
          name: "percentages 2%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas VIP del Publico: Durante los eventos tendremos unas areas VIP en la parte de adelante donde los embajadores tendran acceso garantizado. solo para el Embajador",
          apply: false,
          note: "",
        },
        {
          name: "Embajador Oficial WLDC: Colaboraciones mutuas en nuestras redes sociales con las de los embajadores. Informacion en la pagina web como embajador oficial.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Beneficio solo para le embajador.",
          apply: false,
          note: "",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC ",
          apply: false,
          note: "",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "DOS PERSONAS",
        },
        {
          name: "Area VIP de la competencia",
          apply: true,
          note: "DOS PERSONAS",
        },
        {
          name: "CENA SHOW  DE GALA para la industria",
          apply: true,
          note: "DOS PERSONAS",
        },
        {
          name: "Hotel Oficial : Hotel LAS AMERICAS, sede oficial del evento por dos noches con desayuno incluido, checkin Viernes 9 y checkout Domingo 11",
          apply: false,
          note: "",
        }

      ]
    },
    {
      id: 3,
      name: "ORO",
      min_assistant: 30,
      max_assistant: 49,
      benefits: [
        {
          id: 1,
          percentages: 15,
          name: "percentages 15%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 2.5,
          name: "percentages 2.5%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas VIP del Publico: Durante los eventos tendremos unas areas VIP en la parte de adelante donde los embajadores tendran acceso garantizado. solo para el Embajador",
          apply: false,
          note: "",
        },
        {
          name: "Embajador Oficial WLDC: Colaboraciones mutuas en nuestras redes sociales con las de los embajadores. Informacion en la pagina web como embajador oficial.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Beneficio solo para le embajador.",
          apply: false,
          note: "",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC ",
          apply: false,
          note: "",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "TRES PERSONAS",
        },
        {
          name: "Area VIP de la competencia",
          apply: true,
          note: "TRES PERSONAS",
        },
        {
          name: "CENA SHOW  DE GALA para la industria",
          apply: true,
          note: "TRES PERSONAS",
        },
        {
          name: "Hotel Oficial : Hotel LAS AMERICAS, sede oficial del evento por dos noches con desayuno incluido, checkin Viernes 9 y checkout Domingo 11",
          apply: false,
          note: "Dos personas en una habitacion",
        }
      ]
    },
    {
      id: 4,
      name: "DIAMANTE",
      min_assistant: 50,
      max_assistant: 1000,
      benefits: [
        {
          id: 1,
          percentages: 15,
          name: "percentages 20%",
          description: "En compras de Full pass, weekend pass y categorias",
        },
        {
          id: 2,
          percentages: 3,
          name: "percentages 3%",
          description: "En compras de Hotel",
        },
      ],
      other_benefits: [
        {
          name: "Acreditacion VIP:  Acreditacion de la manilla sin filas y entrega de su Kit personalizado.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas VIP del Publico: Durante los eventos tendremos unas areas VIP en la parte de adelante donde los embajadores tendran acceso garantizado. solo para el Embajador",
          apply: false,
          note: "",
        },
        {
          name: "Embajador Oficial WLDC: Colaboraciones mutuas en nuestras redes sociales con las de los embajadores. Informacion en la pagina web como embajador oficial.",
          apply: false,
          note: "",
        },
        {
          name: "Acceso a areas de la organizacion y backstage: Acceso a las areas de backstage y areas exlusivas de artistas y organizadores. Beneficio solo para le embajador.",
          apply: false,
          note: "",
        },
        {
          name: "Certificacion de Jurado: Certificacion para ser Juez Oficial del WLDC durante el 2024 en las eliminatorias oficiales del WLDC ",
          apply: true,
          note: "Una Persona",
        },
        {
          name: "Areas VIP para el Concierto",
          apply: true,
          note: "CUATRO PERSONAS",
        },
        {
          name: "Area VIP de la competencia",
          apply: true,
          note: "CUATRO PERSONAS",
        },
        {
          name: "CENA SHOW  DE GALA para la industria",
          apply: true,
          note: "CUATRO PERSONAS",
        },
        {
          name: "Hotel Oficial : Hotel LAS AMERICAS, sede oficial del evento por dos noches con desayuno incluido, checkin Viernes 9 y checkout Domingo 11",
          apply: false,
          note: "Tres personas en una habitacion",
        }
      ]
    }

  ]


  constructor() { }


  getBenefits(id, ownerType) {
    let data;
    if (ownerType == "ambassador") {
      data = this.ambassadorsListBenefits.find(level => level.id == id);
    } else if (ownerType == "academy") {
      data = this.academyListBenefits.find(level => level.id == id);
    }

    return data
  }


  /**
   * 
   * @param data 
   * @returns 
   */
  getNivelAmbassador(data) {
    // Suma el total de todos los boletos o paquetes
    const totalTickets = data.reduce((sum, ticket) => sum + ticket.count, 0);

    // Encuentra el nivel que corresponde al total
    const foundLevel = this.ambassadorsListBenefits.find(level => totalTickets >= level.min_assistant && totalTickets <= level.max_assistant);

    return foundLevel
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  getNivelAcademy(data) {
    // Suma el total de todos los boletos o paquetes
    const totalTickets = data.reduce((sum, ticket) => sum + ticket.count, 0);

    // Encuentra el nivel que corresponde al total
    const foundLevel = this.academyListBenefits.find(level => totalTickets >= level.min_assistant && totalTickets <= level.max_assistant);
    console.log(foundLevel);

    return foundLevel
  }
}
