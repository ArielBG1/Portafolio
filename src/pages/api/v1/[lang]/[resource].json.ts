import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { apiResources, languages } from '../../../../i18n/ui';
import { isLang } from '../../../../i18n/utils';
import { apiResourceKeys, getApiResource } from '../../../../lib/api';

// API JSON pública y estática: /api/v1/es/perfil.json, /api/v1/en/projects.json, etc.
export const getStaticPaths = (() =>
  Object.keys(languages)
    .filter(isLang)
    .flatMap((lang) =>
      apiResourceKeys.map((resource) => ({
        params: { lang, resource: apiResources[lang][resource] },
        props: { lang, resource },
      })),
    )) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
  const body = await getApiResource(props.lang, props.resource);
  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
