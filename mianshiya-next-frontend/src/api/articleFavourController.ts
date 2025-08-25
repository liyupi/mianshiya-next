// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** doArticleFavour POST /api/article_favour/ */
export async function doArticleFavourUsingPost(
  body: API.ArticleFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt>('/api/article_favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

