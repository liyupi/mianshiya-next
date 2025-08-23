// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addArticle POST /api/article/add */
export async function addArticleUsingPost(body: API.ArticleAddRequest, options?: { [key: string]: any }) {
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
  params: API.getArticleVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseArticleVO_>('/api/article/get/vo', {
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
  return request<API.BaseResponsePageArticle_>('/api/article/list/page', {
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
  return request<API.BaseResponsePageArticleVO_>('/api/article/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** searchArticleVOByPage POST /api/article/search/page/vo */
export async function searchArticleVOByPageUsingPost(
  body: API.ArticleQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageArticleVO_>('/api/article/search/page/vo', {
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

/** batchDeleteArticles POST /api/article/batch/delete */
export async function batchDeleteArticlesUsingPost(
  body: API.BatchDeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/article/batch/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
