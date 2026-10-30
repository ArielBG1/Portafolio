import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import type { Lang } from './i18n/ui';

/** Una colección de proyectos por idioma: `src/content/projects/<lang>/*.md`. */
function createProjectsCollection(lang: Lang) {
  return defineCollection({
    loader: glob({ base: `./src/content/projects/${lang}`, pattern: '**/[^_]*.md' }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        /** Admite negritas con `**texto**`. */
        description: z.string(),
        /** Nombre del ícono de Lucide, sin prefijo (ej.: `recycle`). */
        icon: z.string().regex(/^[a-z0-9-]+$/, { error: 'Usá el nombre del ícono de Lucide sin prefijo, ej.: "recycle".' }),
        accent: z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/, { error: 'El color de acento debe ser un hex de 6 dígitos, ej.: "#10B981".' })
          .optional(),
        stack: z
          .array(
            z.object({
              /** id de Iconify con prefijo (ej.: `skill-icons:react-dark`). */
              icon: z.string().regex(/^[a-z0-9-]+:[a-z0-9-]+$/, { error: 'Usá un id de Iconify con prefijo, ej.: "skill-icons:react-dark".' }),
              name: z.string(),
            }),
          )
          .min(1),
        repo: z.url(),
        demo: z.url().optional(),
        featured: z.boolean().default(false),
        order: z.number().int(),
        /** Ruta relativa al .md, ej.: `../../../assets/projects/cyclo.png`. */
        image: image().optional(),
        team: z.string().optional(),
        /** Tu rol en el proyecto (ej.: "Desarrollador full stack · Líder técnico"). */
        role: z.string().optional(),
      }),
  });
}

export const collections = {
  projectsEs: createProjectsCollection('es'),
  projectsEn: createProjectsCollection('en'),
};
