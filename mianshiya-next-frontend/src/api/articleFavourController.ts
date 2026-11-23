// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addArticleFavour POST /api/articleFavour/add */
export async function addArticleFavourUsingPost(
  body: API.ArticleFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/articleFavour/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteArticleFavour POST /api/articleFavour/delete */
export async function deleteArticleFavourUsingPost(
  body: API.ArticleFavourDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/articleFavour/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listArticleFavourByPage POST /api/articleFavour/list/page */
export async function listArticleFavourByPageUsingPost(
  body: API.ArticleFavourQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticleFavour_>('/api/articleFavour/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
