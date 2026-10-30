export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

/** Códigos usados en `og:locale`. */
export const ogLocales: Record<Lang, string> = {
  es: 'es_PY',
  en: 'en_US',
};

/** ids de las secciones de la página, traducidos para que las anclas se lean bien en cada idioma. */
export const sectionIds = {
  es: {
    about: 'sobre-mi',
    stack: 'stack',
    experience: 'experiencia',
    projects: 'proyectos',
    github: 'github',
    education: 'formacion',
    contact: 'contacto',
  },
  en: {
    about: 'about',
    stack: 'stack',
    experience: 'experience',
    projects: 'projects',
    github: 'github',
    education: 'education',
    contact: 'contact',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type SectionKey = keyof (typeof sectionIds)['es'];

/** Recursos de la API JSON pública: `/api/v1/<lang>/<slug>.json` (ver src/pages/api). */
export const apiResources = {
  es: {
    profile: 'perfil',
    stack: 'stack',
    experience: 'experiencia',
    projects: 'proyectos',
    education: 'formacion',
    contact: 'contacto',
  },
  en: {
    profile: 'profile',
    stack: 'stack',
    experience: 'experience',
    projects: 'projects',
    education: 'education',
    contact: 'contact',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type ApiResource = keyof (typeof apiResources)['es'];

/** Líneas del perfil profesional (se muestran en el recurso `perfil` de la API). */
export const heroRoles: Record<Lang, readonly string[]> = {
  es: [
    'Backend Developer | C# · .NET',
    'APIs REST · PostgreSQL · SQL Server',
    'Frontend con React + Tailwind',
    'Estudiante de Ingeniería Informática',
  ],
  en: [
    'Backend Developer | C# · .NET',
    'REST APIs · PostgreSQL · SQL Server',
    'Frontend with React + Tailwind',
    'Computer Engineering Student',
  ],
};

const es = {
  'meta.title': 'Ariel Bogado · Backend Developer C# / .NET',
  'meta.description':
    'Portafolio de Ariel Bogado, desarrollador backend en C# y .NET de Paraguay. APIs REST, PostgreSQL, SQL Server y frontend con React y Tailwind CSS.',
  'meta.ogAlt': 'Ariel Bogado, Backend Developer C# / .NET',

  'a11y.skip': 'Saltar al contenido',
  'a11y.newTab': '(se abre en una pestaña nueva)',

  'nav.label': 'Navegación principal',
  'nav.home': 'Ariel Bogado, ir al inicio',
  'nav.openMenu': 'Abrir menú',
  'nav.closeMenu': 'Cerrar menú',
  'nav.about': 'Sobre mí',
  'nav.stack': 'Stack',
  'nav.experience': 'Experiencia',
  'nav.projects': 'Proyectos',
  'nav.education': 'Formación',
  'nav.contact': 'Contacto',

  'theme.toggle': 'Modo oscuro',
  'lang.label': 'Idioma',

  'social.label': 'Redes y contacto',
  'social.linkedin': 'Perfil de LinkedIn',
  'social.github': 'Perfil de GitHub',
  'social.email': 'Enviar un email',

  'hero.roles': 'Perfil',
  'hero.cv': 'Descargar CV',
  'hero.contact': 'Contactame',
  'hero.photoAlt': 'Foto de Ariel Bogado',
  'hero.loadTime': 'Tiempo real de respuesta del servidor para esta página',

  'json.name': 'nombre',
  'json.role': 'rol',
  'json.profile': 'perfil',
  'json.location': 'ubicacion',
  'json.interests': 'intereses',
  'json.email': 'email',
  'json.message': 'mensaje',
  'json.title': 'titulo',
  'json.featured': 'destacado',
  'json.team': 'equipo',
  'json.company': 'empresa',
  'json.from': 'desde',
  'json.to': 'hasta',
  'json.tasks': 'tareas',
  'json.area': 'area',
  'json.degrees': 'carreras',
  'json.institution': 'institucion',
  'json.status': 'estado',
  'json.courses': 'cursos',
  'json.hours': 'horas',
  'json.languages': 'idiomas',
  'json.language': 'idioma',
  'json.level': 'nivel',
  'json.frontend': 'frontend',
  'json.backend': 'backend',
  'json.databases': 'bases_de_datos',
  'json.tools': 'herramientas',

  'api.label': 'Cliente de la API del portafolio',
  'api.collection': 'Endpoints',
  'api.send': 'Enviar',
  'api.body': 'Body',
  'api.headers': 'Headers',
  'api.copy': 'Copiar respuesta',
  'api.copied': 'Copiado',
  'api.open': 'Abrir JSON',
  'api.response': 'Respuesta',
  'api.error': 'Error de red',
  'api.received': 'Respuesta recibida',

  'status.ok': '200 OK',
  'status.created': '201 Created',
  'status.invalid': '422 Unprocessable Entity',
  'status.unavailable': '503 Service Unavailable',
  'status.pending': 'pendiente…',

  'about.title': 'Sobre mí',
  'about.highlights': 'Puntos destacados',

  'stack.title': 'Stack tecnológico',
  'stack.backend': 'Backend',
  'stack.databases': 'Bases de datos',
  'stack.frontend': 'Frontend',
  'stack.tools': 'Herramientas',
  'stack.http': 'HTTP · JSON',
  'stack.sql': 'SQL',
  'stack.total': 'tecnologías',

  'experience.title': 'Experiencia',
  'experience.present': 'Presente',
  'experience.logFile': 'experiencia.log',

  'projects.title': 'Proyectos',
  'projects.featured': 'Destacado',
  'projects.stack': 'Tecnologías',
  'projects.repo': 'Ver repositorio',
  'projects.demo': 'Demo en vivo',
  'projects.role': 'Rol',

  'github.title': 'Actividad en GitHub',
  'github.langsAlt': 'Lenguajes más usados por Ariel Bogado en GitHub',
  'github.monitorAlt':
    'API monitor: contribuciones de Ariel Bogado en GitHub de los últimos 12 meses como requests por día, con total, racha actual, racha máxima y día pico',
  'github.profile': 'Ver perfil en GitHub',

  'education.title': 'Formación',
  'education.academic': 'Formación académica',
  'education.courses': 'Cursos',
  'education.languages': 'Idiomas',
  'education.hours': 'horas',

  'contact.title': 'Contacto',
  'contact.text':
    '¿Tenés una propuesta de trabajo o un proyecto freelance en mente? Escribime y te respondo a la brevedad.',
  'contact.formTitle': 'Enviame un mensaje',
  'contact.channels': 'Otros canales',
  'contact.channelEmail': 'Email',
  'contact.channelLinkedin': 'LinkedIn',
  'contact.channelGithub': 'GitHub',
  'contact.name': 'Nombre',
  'contact.namePlaceholder': 'Tu nombre',
  'contact.email': 'Email',
  'contact.emailPlaceholder': 'tu@email.com',
  'contact.message': 'Mensaje',
  'contact.messagePlaceholder': 'Contame en qué puedo ayudarte',
  'contact.required': 'obligatorio',
  'contact.honeypot': 'No completes este campo',
  'contact.submit': 'Enviar mensaje',
  'contact.sending': 'Enviando…',
  'contact.success': '¡Gracias! Tu mensaje fue enviado. Te respondo pronto.',
  'contact.error': 'No se pudo enviar el mensaje. Probá de nuevo en unos minutos o escribime por email.',
  'contact.invalid': 'Revisá los campos marcados antes de enviar.',
  'contact.nameError': 'Ingresá tu nombre.',
  'contact.emailError': 'Ingresá un email válido.',
  'contact.messageError': 'Escribí un mensaje de al menos 10 caracteres.',
  'contact.notConfigured':
    'El formulario de contacto todavía no está disponible. Mientras tanto, podés escribirme directamente por email.',
  'contact.mailto': 'Escribir un email',
  'contact.subject': 'Nuevo mensaje desde el portafolio',
  'contact.fromName': 'Portafolio de Ariel Bogado',
  'contact.requestBody': 'Body del request',
  'contact.response': 'Respuesta',
  'contact.idle': 'Esperando el envío…',
  'contact.curl': 'cURL',

  'footer.madeWith': 'Hecho con Astro',
  'footer.backToTop': 'Volver arriba',
  'footer.shell': 'Elegí una terminal',
  'footer.cmd': 'Símbolo del sistema',
  'footer.dir': 'portafolio',
  'footer.socialFile': 'redes.txt',

  'sections.expandAll': 'Expandir todo',
  'sections.collapseAll': 'Contraer todo',
  'sections.endpoints': 'endpoints',
  'footer.endpoints': 'Endpoints',
  'footer.elsewhere': 'Redes',
  'footer.api': 'API pública',
} as const;

export type UiKey = keyof typeof es;

const en: Record<UiKey, string> = {
  'meta.title': 'Ariel Bogado · Backend Developer C# / .NET',
  'meta.description':
    'Portfolio of Ariel Bogado, a backend developer specializing in C# and .NET, based in Paraguay. REST APIs, PostgreSQL, SQL Server, and React frontends with Tailwind CSS.',
  'meta.ogAlt': 'Ariel Bogado, Backend Developer C# / .NET',

  'a11y.skip': 'Skip to content',
  'a11y.newTab': '(opens in a new tab)',

  'nav.label': 'Main navigation',
  'nav.home': 'Ariel Bogado, go to home',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.about': 'About',
  'nav.stack': 'Stack',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.education': 'Education',
  'nav.contact': 'Contact',

  'theme.toggle': 'Dark mode',
  'lang.label': 'Language',

  'social.label': 'Social links and contact',
  'social.linkedin': 'LinkedIn profile',
  'social.github': 'GitHub profile',
  'social.email': 'Send an email',

  'hero.roles': 'Profile',
  'hero.cv': 'Download CV',
  'hero.contact': 'Contact me',
  'hero.photoAlt': 'Photo of Ariel Bogado',
  'hero.loadTime': 'Actual server response time for this page',

  'json.name': 'name',
  'json.role': 'role',
  'json.profile': 'profile',
  'json.location': 'location',
  'json.interests': 'interests',
  'json.email': 'email',
  'json.message': 'message',
  'json.title': 'title',
  'json.featured': 'featured',
  'json.team': 'team',
  'json.company': 'company',
  'json.from': 'from',
  'json.to': 'to',
  'json.tasks': 'tasks',
  'json.area': 'area',
  'json.degrees': 'degrees',
  'json.institution': 'institution',
  'json.status': 'status',
  'json.courses': 'courses',
  'json.hours': 'hours',
  'json.languages': 'languages',
  'json.language': 'language',
  'json.level': 'level',
  'json.frontend': 'frontend',
  'json.backend': 'backend',
  'json.databases': 'databases',
  'json.tools': 'tools',

  'api.label': 'Portfolio API client',
  'api.collection': 'Endpoints',
  'api.send': 'Send',
  'api.body': 'Body',
  'api.headers': 'Headers',
  'api.copy': 'Copy response',
  'api.copied': 'Copied',
  'api.open': 'Open JSON',
  'api.response': 'Response',
  'api.error': 'Network error',
  'api.received': 'Response received',

  'status.ok': '200 OK',
  'status.created': '201 Created',
  'status.invalid': '422 Unprocessable Entity',
  'status.unavailable': '503 Service Unavailable',
  'status.pending': 'pending…',

  'about.title': 'About me',
  'about.highlights': 'Highlights',

  'stack.title': 'Tech stack',
  'stack.backend': 'Backend',
  'stack.databases': 'Databases',
  'stack.frontend': 'Frontend',
  'stack.tools': 'Tools',
  'stack.http': 'HTTP · JSON',
  'stack.sql': 'SQL',
  'stack.total': 'technologies',

  'experience.title': 'Experience',
  'experience.present': 'Present',
  'experience.logFile': 'experience.log',

  'projects.title': 'Projects',
  'projects.featured': 'Featured',
  'projects.stack': 'Technologies',
  'projects.repo': 'View repository',
  'projects.demo': 'Live demo',
  'projects.role': 'Role',

  'github.title': 'GitHub activity',
  'github.langsAlt': "Ariel Bogado's most used languages on GitHub",
  'github.monitorAlt':
    "API monitor: Ariel Bogado's GitHub contributions over the last 12 months as requests per day, with total, current streak, longest streak, and peak day",
  'github.profile': 'View GitHub profile',

  'education.title': 'Education',
  'education.academic': 'Academic background',
  'education.courses': 'Courses',
  'education.languages': 'Languages',
  'education.hours': 'hours',

  'contact.title': 'Contact',
  'contact.text':
    "Have a job opportunity or a freelance project in mind? Send me a message and I'll get back to you soon.",
  'contact.formTitle': 'Send me a message',
  'contact.channels': 'Other channels',
  'contact.channelEmail': 'Email',
  'contact.channelLinkedin': 'LinkedIn',
  'contact.channelGithub': 'GitHub',
  'contact.name': 'Name',
  'contact.namePlaceholder': 'Your name',
  'contact.email': 'Email',
  'contact.emailPlaceholder': 'you@email.com',
  'contact.message': 'Message',
  'contact.messagePlaceholder': 'Tell me how I can help',
  'contact.required': 'required',
  'contact.honeypot': 'Leave this field empty',
  'contact.submit': 'Send message',
  'contact.sending': 'Sending…',
  'contact.success': "Thanks! Your message has been sent. I'll get back to you soon.",
  'contact.error': "Your message couldn't be sent. Please try again in a few minutes or email me directly.",
  'contact.invalid': 'Please review the highlighted fields before sending.',
  'contact.nameError': 'Please enter your name.',
  'contact.emailError': 'Please enter a valid email address.',
  'contact.messageError': 'Please write a message of at least 10 characters.',
  'contact.notConfigured':
    "The contact form isn't available yet. In the meantime, feel free to email me directly.",
  'contact.mailto': 'Send an email',
  'contact.subject': 'New message from the portfolio',
  'contact.fromName': "Ariel Bogado's portfolio",
  'contact.requestBody': 'Request body',
  'contact.response': 'Response',
  'contact.idle': 'Waiting for the request…',
  'contact.curl': 'cURL',

  'footer.madeWith': 'Built with Astro',
  'footer.backToTop': 'Back to top',
  'footer.shell': 'Choose a terminal',
  'footer.cmd': 'Command Prompt',
  'footer.dir': 'portfolio',
  'footer.socialFile': 'social.txt',

  'sections.expandAll': 'Expand all',
  'sections.collapseAll': 'Collapse all',
  'sections.endpoints': 'endpoints',
  'footer.endpoints': 'Endpoints',
  'footer.elsewhere': 'Elsewhere',
  'footer.api': 'Public API',
};

export const ui: Record<Lang, Record<UiKey, string>> = { es, en };
