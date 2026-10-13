// Categorías e interacciones tal como las ven los lectores, en español.
import type { Messages } from '../en';

export const taxonomy: Messages['taxonomy'] = {
  categories: {
    Alerts: {
      name: 'Alertas',
      title: 'Iconos animados de alerta',
      intro:
        'Triángulos de advertencia, círculos de alerta y señales de stop que laten lo justo para llamar la atención sin parpadear. Colócalos junto a un campo de formulario con error, al principio de un banner de error o en una columna de estado, donde un icono estático pasa fácilmente desapercibido.',
      useCases: [
        'Errores de validación bajo los campos de un formulario',
        'Banners de error y de advertencia en la parte superior de una página',
        'Filas fallidas en una tabla de estado de despliegues o tareas',
        'Diálogos de confirmación de acciones destructivas',
        'Páginas de estado del sistema durante una incidencia',
      ],
    },
    Notifications: {
      name: 'Notificaciones',
      title: 'Iconos animados de campana de notificación',
      intro:
        'Campanas que suenan cuando hay actividad nueva o que alternan entre campana y campana silenciada. Un breve balanceo de la campana dirige la mirada hacia el contador de no leídos, y las versiones que alternan sirven también como control para silenciar un canal o un hilo.',
      useCases: [
        'Botón del centro de notificaciones en la cabecera de una aplicación',
        'Indicador de no leídos que suena cuando llega un mensaje nuevo',
        'Interruptor para silenciar y reactivar un canal o un hilo',
        'Ajustes de notificaciones por correo y push',
        'Botones para suscribirse a recordatorios y alertas',
      ],
    },
    Navigation: {
      name: 'Navegación',
      title: 'Iconos animados de navegación y flechas',
      intro:
        'Menús hamburguesa que se transforman en un botón de cerrar, y flechas, chevrons y flechas de esquina que se desplazan hacia su dirección con hover. Dejan claro adónde lleva cada control: abrir el panel lateral, volver atrás, desplegar una fila o salir del sitio.',
      useCases: [
        'Menú hamburguesa que se convierte en botón de cerrar en móvil',
        'Botones de anterior y siguiente en carruseles y paginación',
        'Chevrons de acordeones y menús desplegables',
        'Indicaciones para volver arriba y para desplazarse hacia abajo',
        'Enlaces de inicio y cierre de sesión',
        'Marcadores de enlaces externos y botones para mostrar u ocultar la barra lateral',
      ],
    },
    Action: {
      name: 'Acciones',
      title: 'Iconos animados de acción',
      intro:
        'Los verbos de una interfaz: guardar, eliminar, descargar, actualizar, dar me gusta, añadir a marcadores, buscar y ajustes. Cada uno confirma el clic o el hover al que responde: un corazón se rellena cuando das me gusta a una publicación y la tapa de una papelera se levanta antes de eliminar.',
      useCases: [
        'Botones de me gusta, favoritos y marcadores en tarjetas',
        'Botones de descargar, subir y guardar que confirman la acción',
        'Botón para mostrar u ocultar la contraseña en un formulario de inicio de sesión',
        'Botones de actualizar y sincronizar en dashboards',
        'Botones de eliminar en tablas y listas de archivos',
        'Campo de búsqueda que se convierte en un botón para borrar',
      ],
    },
    Content: {
      name: 'Contenido',
      title: 'Iconos animados de archivos, carpetas y usuarios',
      intro:
        'Archivos, carpetas, libros, correo, adjuntos y personas. Identifican aquello con lo que trabaja el usuario, y las variantes de añadir, quitar y marcar hacen que gestionar listas y equipos se sienta ágil.',
      useCases: [
        'Gestores de archivos y listas de documentos',
        'Botones de adjuntar y de copiar al portapapeles',
        'Bandeja de entrada y archivo en clientes de correo',
        'Listas de miembros de un equipo con acciones para añadir y quitar usuarios',
        'Menús para compartir documentos y enlaces',
      ],
    },
    Form: {
      name: 'Formularios',
      title: 'Iconos animados de controles de formulario',
      intro:
        'Una casilla de verificación, un botón de opción y un interruptor que se animan entre los estados marcado y desmarcado. Úsalos donde un input normal se queda plano, como en checklists de onboarding y pantallas de ajustes, sin que el estado deje de leerse de un vistazo.',
      useCases: [
        'Interruptores de ajustes para funciones y preferencias',
        'Checklists de onboarding y listas de tareas',
        'Opciones de respuesta única en encuestas y selectores de plan',
        'Casillas de aceptación de términos y de consentimiento',
      ],
    },
    Media: {
      name: 'Multimedia',
      title: 'Iconos animados de reproductor multimedia',
      intro:
        'Reproducir y pausar, volumen, micrófono, cámara, saltar y aleatorio para reproductores de audio y vídeo. Los iconos que alternan cambian entre sus dos estados, de reproducir a pausa o de micrófono a silenciado, así que el botón siempre muestra lo que hará el siguiente clic.',
      useCases: [
        'Botones de reproducir y pausar en reproductores de audio y vídeo',
        'Controles para silenciar y activar el micrófono en videollamadas',
        'Botones para encender y apagar la cámara en apps de reuniones',
        'Controles de lista de reproducción para saltar, repetir y reproducir en aleatorio',
        'Botones de transmisión y AirPlay',
        'Controles de apps de pódcast y música',
      ],
    },
    'Text editing': {
      name: 'Edición de texto',
      title: 'Iconos animados de edición de texto',
      intro:
        'Negrita, cursiva, subrayado, alineación y listas para barras de herramientas de texto enriquecido. Una animación breve al hacer clic confirma que se aplicó el formato, algo útil en editores donde el cambio en el propio texto es sutil.',
      useCases: [
        'Barras de herramientas de editores de texto enriquecido',
        'Cajas para redactar comentarios y mensajes',
        'Editores de CMS y de entradas de blog',
        'Apps de Markdown y de notas',
        'Controles de alineación de texto en herramientas de diseño',
      ],
    },
    Communication: {
      name: 'Comunicación',
      title: 'Iconos animados de comunicación',
      intro:
        'Teléfonos, burbujas de chat, botones de enviar, buzón de voz y RSS. Los iconos de llamada cubren los estados que necesita un registro de llamadas (entrante, saliente, perdida y desviada), y el icono de enviar despide cada mensaje con un pequeño gesto al hacer clic.',
      useCases: [
        'Botón de enviar en formularios de chat y comentarios',
        'Registros de llamadas entrantes, salientes y perdidas',
        'Botones de contacto y de soporte',
        'Botones para abrir un widget de chat',
        'Campos de menciones y de direcciones de correo',
      ],
    },
    Devices: {
      name: 'Dispositivos',
      title: 'Iconos animados de dispositivos',
      intro:
        'Teléfonos, tabletas, monitores, relojes e impresoras, además de los indicadores de conexión que los rodean: wifi, Bluetooth y batería. Sirven para selectores de dispositivo, conmutadores de vista previa responsive y estado de conectividad.',
      useCases: [
        'Conmutadores de vista previa responsive para móvil, tableta y escritorio',
        'Estado de la conexión wifi y Bluetooth',
        'Indicadores de batería y de carga',
        'Listas de dispositivos en los ajustes de seguridad de la cuenta',
        'Botones de imprimir en facturas e informes',
      ],
    },
    Weather: {
      name: 'Clima',
      title: 'Iconos animados del clima',
      intro:
        'Sol, luna, nubes, lluvia, nieve, rayos y viento para pronósticos y para todo lo que siga la hora del día. El sol y la luna también funcionan como un interruptor natural entre modo claro y modo oscuro.',
      useCases: [
        'Widgets del tiempo y tarjetas de pronóstico',
        'Interruptores entre tema claro y tema oscuro',
        'Horas de amanecer y atardecer en apps de viajes',
        'Lecturas de temperatura en paneles de casa inteligente',
        'Indicadores de energía y de estado de alimentación',
      ],
    },
    'Maps & location': {
      name: 'Mapas y ubicación',
      title: 'Iconos animados de mapas y ubicación',
      intro:
        'Pines de mapa, flechas de navegación, globos terráqueos, dianas y anclas. Un pin que cae con hover ayuda a que destaque un localizador de tiendas o una dirección de entrega, y el globo funciona como selector de idioma o de región.',
      useCases: [
        'Localizadores de tiendas y campos de dirección',
        'Botones de ubicación actual y de cómo llegar',
        'Selectores de idioma y de región',
        'Entregas y seguimiento de pedidos',
        'Apps de viajes y de reservas',
      ],
    },
    Commerce: {
      name: 'Comercio electrónico',
      title: 'Iconos animados de comercio electrónico',
      intro:
        'Carritos, bolsas de compra, etiquetas de precio, regalos, tarjetas de crédito y camiones de reparto para tiendas online. Una animación de añadir al carrito confirma el clic sin necesidad de un aviso emergente, y los iconos del camión y del paquete dan un poco de vida al estado del pedido.',
      useCases: [
        'Botones de añadir al carrito en tarjetas de producto',
        'Botones de carrito y bolsa en la cabecera de una tienda',
        'Pago y selección del método de pago',
        'Distintivos de descuentos, cupones y rebajas',
        'Pasos de envío y seguimiento del pedido',
        'Tarjetas regalo y opciones de envoltorio',
      ],
    },
    Charts: {
      name: 'Gráficos',
      title: 'Iconos animados de gráficos',
      intro:
        'Gráficos de barras, un gráfico circular y flechas de tendencia para analítica e informes. Los iconos de tendencia al alza y a la baja muestran de un vistazo si una métrica subió o bajó, lo que encaja en tarjetas de KPI y en registros de cambios de cifras.',
      useCases: [
        'Tarjetas de KPI con métricas al alza o a la baja',
        'Elementos de navegación de analítica e informes',
        'Estados vacíos de dashboards',
        'Resúmenes financieros y de cartera',
      ],
    },
    Development: {
      name: 'Desarrollo',
      title: 'Iconos animados para desarrolladores',
      intro:
        'Llaves de código, una terminal, ramas de Git, commits, merges y pull requests, además de servidores y bases de datos. Pensados para herramientas de desarrollo, sitios de documentación y páginas de estado donde los términos de Git y de infraestructura forman parte de la interfaz.',
      useCases: [
        'Estado de pull requests, merges y ramas en herramientas de desarrollo',
        'Botones de fragmento de código y de insertar en la documentación',
        'Secciones de terminal y CLI en landing pages',
        'Estado de servidores y bases de datos en páginas de estado',
        'Atajos de teclado con la tecla Command',
      ],
    },
    'Design & layout': {
      name: 'Diseño y maquetación',
      title: 'Iconos animados de diseño y maquetación',
      intro:
        'Cuadrículas, columnas, capas, recorte, pluma y cursor para editores y constructores de páginas. Encajan en barras de herramientas donde los usuarios organizan contenido, cambian entre vista de cuadrícula y de tabla o eligen una herramienta de dibujo.',
      useCases: [
        'Conmutadores entre vista de cuadrícula, lista y tabla',
        'Paneles de capas en herramientas de diseño y de presentaciones',
        'Herramientas de recortar en editores de imágenes',
        'Constructores de páginas y selectores de diseño',
        'Asas para arrastrar y mover',
      ],
    },
    'Shapes & math': {
      name: 'Formas y matemáticas',
      title: 'Iconos animados de formas y matemáticas',
      intro:
        'Círculos, cuadrados, triángulos, hexágonos, un octógono y signos de división. Úsalos como herramientas de formas en apps de dibujo, como operadores de una calculadora o como marcadores neutros en diagramas y pasos de onboarding.',
      useCases: [
        'Herramientas de formas en pizarras y apps de dibujo',
        'Operadores de calculadoras y editores de fórmulas',
        'Viñetas y marcadores de pasos en diagramas',
        'Interfaces de cuestionarios y juegos',
      ],
    },
    Loading: {
      name: 'Carga',
      title: 'Iconos animados de carga',
      intro:
        'Spinners y loaders que se repiten en bucle mientras algo está en curso. Pon uno dentro de un botón de envío mientras se ejecuta una petición, en lugar del contenido que aún se está cargando o en una pantalla de bienvenida a pantalla completa; se quedan quietos cuando el usuario prefiere movimiento reducido.',
      useCases: [
        'Botones de envío a la espera de una petición',
        'Placeholders mientras se carga una lista o un gráfico',
        'Indicadores de scroll infinito y de cargar más',
        'Pantallas de bienvenida y transiciones entre rutas',
        'Progreso de subida y procesamiento de archivos',
      ],
    },
    'Social media': {
      name: 'Redes sociales',
      title: 'Iconos animados de redes sociales',
      intro:
        'Iconos de marca de redes sociales y de las herramientas donde desarrolladores y diseñadores comparten su trabajo: X, Instagram, YouTube, Discord, Telegram, Figma y más. Se animan con hover, lo que hace que los enlaces del pie de página y del perfil inviten a hacer clic.',
      useCases: [
        'Enlaces a redes sociales en el pie de un sitio',
        'Botones para compartir en entradas de blog',
        'Enlaces a perfiles de autores y del equipo',
        'Botones de invitación a servidores de chat de la comunidad',
        'Inicio de sesión con una cuenta social o de desarrollador',
      ],
    },
    Other: {
      name: 'Otros',
      title: 'Más iconos animados',
      intro:
        'Iconos que no pertenecen a un grupo mayor: caras emoji para valoraciones, una taza de café, un reloj, una línea de pulso y una indicación para desplazarse hacia abajo. El icono de desplazamiento es una pista habitual en la sección hero para indicar que hay más contenido debajo.',
      useCases: [
        'Indicaciones para desplazarse hacia abajo al final de una sección hero',
        'Caras alegres, neutras y tristes en widgets de valoración',
        'Indicadores de actividad y de disponibilidad',
        'Horarios de apertura y selectores de hora',
        'Enlaces de Buy Me a Coffee y de apoyo',
      ],
    },
  },
  interactions: {
    loop: {
      label: 'Bucle',
      title: 'Iconos animados en bucle',
      intro:
        'Estos iconos se reproducen sin parar mientras están en pantalla, así que encajan con estados que duran: algo se está cargando, hay una advertencia activa, una terminal está esperando. Si se prefiere movimiento reducido, se detienen en su primer fotograma y se leen como un icono normal.',
      useCases: [
        'Spinners de carga e indicadores de progreso',
        'Estados activos de advertencia y de error',
        'Indicadores de directo y de grabación',
        'Indicaciones para desplazarse hacia abajo en secciones hero',
        'Marcadores que llaman la atención sobre notificaciones nuevas',
      ],
      example:
        'Los iconos en bucle suelen usarse para spinners de carga, alertas activas, una campana que suena o una indicación para desplazarse hacia abajo.',
      description:
        'Se reproduce sin parar; se queda en el primer fotograma estático si se prefiere movimiento reducido.',
      reducedMotion:
        'Si se prefiere movimiento reducido, el icono no se reproduce automáticamente y se queda en su primer fotograma estático.',
      plays: 'se reproducen sin parar',
    },
    'click-toggle': {
      label: 'Alternar con clic',
      title: 'Iconos animados que alternan con un clic',
      intro:
        'Cada clic anima el icono entre dos estados y lo deja en el nuevo, lo que convierte estos iconos en la parte visual de un control de activar y desactivar. El icono siempre muestra el estado actual, así que combínalo con aria-pressed o con un atributo checked y el botón se explica solo.',
      useCases: [
        'Botones para silenciar y reactivar el sonido',
        'Campos para mostrar y ocultar la contraseña',
        'Botones de menú hamburguesa y de cerrar',
        'Controles de reproducir y pausar',
        'Botones de me gusta, estrella y marcador',
        'Casillas de verificación, botones de opción e interruptores',
      ],
      example:
        'Los iconos que alternan con un clic suelen controlar botones de silenciar y reactivar, mostrar y ocultar contraseña, menú y cerrar, reproducir y pausar, y me gusta.',
      description:
        'Alterna entre dos estados al hacer clic, o cambia de inmediato si se prefiere movimiento reducido.',
      reducedMotion:
        'Si se prefiere movimiento reducido, un clic cambia al otro estado de inmediato, sin la animación intermedia.',
      plays: 'alternan entre dos estados al hacer clic',
    },
    'click-replay': {
      label: 'Repetir con clic',
      title: 'Iconos animados al hacer clic',
      intro:
        'Estos iconos se reproducen una vez desde el principio cada vez que se hace clic en ellos, como una pequeña confirmación de que la acción se completó. Encajan con acciones puntuales que no dejan un estado: enviar, guardar, actualizar, descargar, imprimir o eliminar.',
      useCases: [
        'Botones de enviar en formularios de chat y comentarios',
        'Botones de guardar, descargar y subir',
        'Botones de actualizar y girar',
        'Botones de añadir al carrito',
        'Botones de formato de texto en editores',
      ],
      example:
        'Los iconos que se animan al hacer clic suelen confirmar botones de enviar, guardar, actualizar, descargar, añadir al carrito y dar formato.',
      description:
        'Se reproduce una vez desde el principio con cada clic, salvo que se prefiera movimiento reducido.',
      reducedMotion:
        'Si se prefiere movimiento reducido, los clics siguen llegando a tu handler, pero la animación no se reproduce.',
      plays: 'se repiten con cada clic',
    },
    hover: {
      label: 'Hover',
      title: 'Iconos animados con hover',
      intro:
        'Estos iconos avanzan cuando entra el puntero y retroceden cuando sale, así que el movimiento sigue al cursor y nunca se queda a medias. Encajan en elementos de navegación y en botones que anticipan lo que abren: la tapa de una papelera se levanta, el engranaje de ajustes gira, una carpeta se abre.',
      useCases: [
        'Elementos de la barra lateral y del menú de navegación',
        'Botones de eliminar que levantan la tapa antes del clic',
        'Enlaces a ajustes y al perfil',
        'Controles para acercar y alejar el zoom',
        'Enlaces a redes sociales en el pie de página',
      ],
      example:
        'Los iconos con hover suelen marcar elementos de navegación, botones de eliminar, ajustes, controles de zoom y enlaces a redes sociales.',
      description: 'Avanza con mouseenter y retrocede con mouseleave.',
      reducedMotion: 'Si se prefiere movimiento reducido, el hover no reproduce la animación.',
      plays: 'se reproducen con hover y retroceden al salir el cursor',
    },
    'hover-replay': {
      label: 'Repetir con hover',
      title: 'Iconos animados que se reproducen con hover',
      intro:
        'Estos iconos se reproducen una vez cuando entra el puntero y terminan por sí solos, lo que evita que un paso rápido por una barra de herramientas se convierta en un movimiento nervioso. La mayor parte del set funciona así: flechas, archivos, dispositivos, clima e iconos de marca que cobran vida con hover.',
      useCases: [
        'Listas de funciones y tablas de precios',
        'Enlaces con flecha y botones de llamada a la acción',
        'Botones de barras de herramientas en editores y dashboards',
        'Tarjetas en la cuadrícula de una landing page',
        'Enlaces del pie de página y de contacto',
      ],
      example:
        'Los iconos que se reproducen con hover suelen animar enlaces con flecha, listas de funciones, botones de barras de herramientas y tarjetas de landing pages.',
      description:
        'Se reproduce una vez con mouseenter, salvo que se prefiera movimiento reducido. Salir no lo detiene, y volver a entrar durante la reproducción no lo reinicia.',
      reducedMotion: 'Si se prefiere movimiento reducido, el hover no reproduce la animación.',
      plays: 'se reproducen una vez con hover',
    },
    'hover-loop': {
      label: 'Bucle con hover',
      title: 'Iconos animados en bucle con hover',
      intro:
        'Estos iconos se repiten en bucle mientras el puntero está sobre ellos y terminan el ciclo en curso cuando sale, así que nunca se detienen a mitad del movimiento. Funcionan bien en enlaces que invitan a mirar con calma, sobre todo iconos sociales y de comunidad.',
      useCases: [
        'Enlaces a redes sociales en cabeceras y pies de página',
        'Botones de invitación a comunidades y chats',
        'Enlaces a portafolios y perfiles',
        'Selectores de idioma y de región',
      ],
      example:
        'Los iconos en bucle con hover suelen marcar enlaces sociales, invitaciones a comunidades, enlaces a portafolios y selectores de idioma.',
      description:
        'Se repite en bucle durante el hover, termina el ciclo en curso tras mouseleave y se queda estático si se prefiere movimiento reducido.',
      reducedMotion:
        'Si se prefiere movimiento reducido, el icono se queda estático durante el hover.',
      plays: 'se repiten en bucle mientras el cursor está encima',
    },
  },
};
