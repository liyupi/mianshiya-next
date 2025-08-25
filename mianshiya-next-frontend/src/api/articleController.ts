// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addArticle POST /api/article/add */
export async function addArticleUsingPost(
  body: API.ArticleAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/article/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteArticle POST /api/article/delete */
export async function deleteArticleUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editArticle POST /api/article/edit */
export async function editArticleUsingPost(
  body: API.ArticleEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getArticleVOById GET /api/article/get/vo */
export async function getArticleVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getArticleVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseArticleVO>('/api/article/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listArticleByPage POST /api/article/list/page */
export async function listArticleByPageUsingPost(
  body: API.ArticleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticle>('/api/article/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listArticleVOByPage POST /api/article/list/page/vo */
export async function listArticleVoByPageUsingPost(
  body: API.ArticleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticleVO>('/api/article/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyArticleVOByPage POST /api/article/my/list/page/vo */
export async function listMyArticleVoByPageUsingPost(
  body: API.ArticleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticleVO>('/api/article/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateArticle POST /api/article/update */
export async function updateArticleUsingPost(
  body: API.ArticleUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
