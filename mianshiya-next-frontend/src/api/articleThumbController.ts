// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** doThumb POST /api/article_thumb/ */
export async function doThumbUsingPost(
  body: API.ArticleThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt>('/api/article_thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

