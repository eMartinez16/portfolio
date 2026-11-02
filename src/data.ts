export const profile = {
  name: 'Emiliano Martínez',
  fullName: 'Emiliano Damian Martinez',
  title: 'Full Stack Developer',
  focus: 'Automatización e IA aplicada',
  location: 'Caleta Olivia, Santa Cruz, Argentina',
  email: 'emartinezd16@gmail.com',
  github: 'https://github.com/eMartinez16',
  linkedin: 'https://www.linkedin.com/in/emiliano-mart%C3%ADnez-751407201/',
  workana: 'https://www.workana.com/freelancer/e285e97d38526e193738589dcf43af15',
}

export type Tag = 'IA' | 'Automatización' | 'n8n' | 'Web' | 'IoT' | 'Juegos' | 'Python'

export type Project = {
  id: string
  title: string
  summary: string
  tags: Tag[]
  stack: string[]
  details: string[]
  note?: string
  repo?: string
  cta?: { label: string; href: string }
}

export const projects: Project[] = [
  {
    id: 'bot-pedidos',
    title: 'Bot de pedidos por WhatsApp para gastronómicos',
    summary:
      'Un asistente con IA que atiende a los clientes de un local de comida, muestra la carta y toma el pedido completo, sin que el dueño tenga que estar pendiente del celular.',
    tags: ['IA', 'Automatización', 'n8n'],
    stack: ['n8n', 'Google Sheets', 'Gemini', 'WhatsApp Cloud API', 'Telegram', 'Docker'],
    details: [
      'Carta, precios y datos del local se editan desde una planilla de Google Sheets: el bot toma los cambios solo.',
      'Muestra el menú agrupado por categorías (pizzas, empanadas, bebidas, postres).',
      'Toma el pedido con delivery o retiro; los totales los calcula el sistema, no la IA.',
      'Confirma el pedido y lo registra en la planilla.',
      'Modificaciones y cancelaciones dentro de una ventana configurable por el local.',
      'Responde preguntas frecuentes y registra las que no sabe para que el dueño las complete.',
      'Envía el alias para transferencias y le pasa los comprobantes al dueño para que los apruebe con un botón.',
      'Resumen diario para el dueño: pedidos, cancelados, facturación y preguntas nuevas.',
      'Canales: WhatsApp (API oficial) y Telegram.',
    ],
    note: 'Demo armada para "Pizzería La Esquina", un local ficticio.',
    cta: { label: 'Quiero este bot para mi local', href: '#contacto' },
  },
  {
    id: 'tower-defense',
    title: 'Tower defense 2.5D en Godot 4',
    summary:
      'Prototipo de juego propio: oleadas de enemigos, héroes colocables, una base que también pelea y habilidades activas del jugador. Desarrollado con un equipo de agentes de IA.',
    tags: ['Juegos', 'IA'],
    stack: ['Godot 4.7', 'GDScript', 'Agentes de IA'],
    details: [
      'Vertical slice jugable: un mapa, enemigos con roles distintos (rápido, tanque, buffer) y un jefe en la oleada 10.',
      'Tres capas de combate: la "mano libre" del jugador, héroes con auto-ataque y la base con su propio rango.',
      'Cámara orbital con zoom y economía de oro para comprar y mejorar héroes.',
      'Diseño documentado (GDD, balance, decisiones) que los agentes de IA leen antes de programar.',
    ],
    note: 'Repositorio privado.',
  },
  {
    id: 'rag-td',
    title: 'RAG sobre la documentación del juego (rag-td)',
    summary:
      'Un asistente de búsqueda con recuperación aumentada (RAG) que responde preguntas sobre el diseño, el balance y las decisiones del tower defense, citando el archivo de donde sale cada dato.',
    tags: ['IA', 'Python'],
    stack: ['Python', 'Ollama', 'Embeddings', 'MCP'],
    details: [
      'Indexa los documentos del proyecto y genera fichas de stats a partir de los datos del juego.',
      'Corre 100% local con modelos abiertos, sin depender de APIs pagas.',
      'Se expone como herramienta (MCP) para que los agentes de código consulten el diseño antes de tocar algo.',
      'Evaluado con un set propio de preguntas para medir la calidad de la búsqueda y de las respuestas.',
    ],
  },
  {
    id: 'salimos',
    title: '¿Salimos? · Planificador de viajes en grupo',
    summary:
      'App web para organizar viajes entre amigos en Argentina (piloto: Bariloche). El organizador arma el viaje desde el celular, comparte el link por WhatsApp y cada amigo responde con su presupuesto, que no se muestra a los demás.',
    tags: ['Web'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vitest', 'Playwright'],
    details: [
      'Arma un plan de viaje a partir de las respuestas del grupo y el tope de cada persona en pesos.',
      'Flujo de pago del alojamiento entre amigos: quién pagó, quién le debe a quién y cuánto.',
      'Cotización al dólar oficial al cerrar el plan.',
      'Tests unitarios, de base de datos (pgTAP), simulación de grupos y end-to-end en viewport de celular.',
    ],
    note: 'En desarrollo. Repositorio privado.',
  },
  {
    id: 'cosecha',
    title: 'Cosecha Intuitiva · Monitoreo de invernadero',
    summary:
      'Sistema para monitorear un invernadero: un Arduino lee pH, temperatura del agua y temperatura y humedad del ambiente, y un panel web muestra los valores en tiempo real.',
    tags: ['IoT', 'Python', 'Web'],
    stack: ['Arduino (C/C++)', 'Python', 'Flask', 'PWA', 'Docker'],
    details: [
      'Sensores de pH, DS18B20 (agua) y DHT22 (ambiente) leídos por Arduino y enviados por serial.',
      'Servidor en Flask con simulación de datos cuando no hay hardware conectado.',
      'Panel que se actualiza cada 2 segundos y marca alertas si el pH o la temperatura salen de rango.',
      'Se instala en el celular como PWA y manda alertas con ntfy.',
    ],
    note: 'Repositorio privado.',
  },
  {
    id: 'harness',
    title: 'Harness de agentes de IA',
    summary:
      'Mi configuración de trabajo con agentes de código (Claude Code y Cursor) versionada y portable: reglas, hooks, skills y ruteo de modelos por costo, con un instalador para llevarla a otra máquina.',
    tags: ['IA', 'Automatización'],
    stack: ['Claude Code', 'Cursor', 'Bash', 'Python', 'Rust', 'MCP'],
    details: [
      'Instalador interactivo que hace backup de cada archivo antes de reemplazarlo.',
      'Ruteo de modelo por costo desde una única fuente de configuración, sincronizada a Claude Code y Cursor.',
      'Hooks y skills propios compartidos entre las dos herramientas.',
      'Servidor MCP de solo lectura en Rust que resume los patrones repetidos de uso de herramientas que detecta el harness, ordenados por ahorro estimado de tokens.',
    ],
    note: 'Repositorio privado.',
  },
  {
    id: 'n8n-jira',
    title: 'Automatización de Jira con n8n',
    summary:
      'Flujos de n8n que automatizan tareas repetitivas alrededor de Jira para un equipo de desarrollo.',
    tags: ['Automatización', 'n8n'],
    stack: ['n8n', 'Jira', 'Docker'],
    details: [
      'Automatiza pasos manuales del flujo de trabajo de tickets.',
      'Proyecto interno de trabajo: el código no es público.',
    ],
  },
]

export type Job = {
  role: string
  company: string
  period: string
  description: string
  stack: string[]
}

export const experience: Job[] = [
  {
    role: 'Full Stack Developer',
    company: 'Inisoft',
    period: 'Feb 2024 – actualidad',
    description:
      'Desarrollo y mantenimiento de una aplicación multiempresa. Integración de varias aplicaciones en un único sistema.',
    stack: ['Laravel', 'NestJS', 'Angular', 'Node.js', 'MySQL', 'Docker'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Syloper',
    period: 'Ene 2022 – Ene 2024',
    description: 'Desarrollo y mantenimiento de múltiples aplicaciones, APIs REST y monolitos.',
    stack: ['CakePHP 3/4', 'Laravel 8', 'Angular', 'TypeScript', 'Node.js', 'MySQL', 'Docker'],
  },
  {
    role: 'Junior Backend Developer',
    company: 'Minexus',
    period: 'Sep 2021 – Ene 2022',
    description: 'Mantenimiento de una aplicación para empresas mineras y petroleras.',
    stack: ['PHP 7.4', 'CakePHP', 'Node.js', 'MySQL', 'REST', 'GitLab', 'Docker'],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['PHP', 'Laravel', 'CakePHP', 'Node.js', 'NestJS'] },
  { group: 'Frontend', items: ['TypeScript', 'JavaScript', 'Angular'] },
  { group: 'Datos', items: ['MySQL', 'PostgreSQL'] },
  { group: 'DevOps', items: ['Docker', 'CI/CD', 'Git', 'Linux'] },
  { group: 'IA y automatización', items: ['n8n', 'Gemini', 'RAG', 'Agentes de IA'] },
]

export const education = [
  { title: 'Técnico Universitario en Programación', place: 'UTN, Córdoba', year: '2021' },
  { title: 'Técnico en Computación Personal y Profesional', place: 'E.I.C.O', year: '2018' },
]
