// @ts-ignore
/* eslint-disable */
import request from '@/libs/request';

/** addQuestionBankQuestion POST /api/questionBankQuestion/add */
export async function addQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/questionBankQuestion/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteQuestionBankQuestion POST /api/questionBankQuestion/delete */
export async function deleteQuestionBankQuestionUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBankQuestion/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getQuestionBankQuestionVOById GET /api/questionBankQuestion/get/vo */
export async function getQuestionBankQuestionVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionBankQuestionVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionBankQuestionVO_>('/api/questionBankQuestion/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listQuestionBankQuestionByPage POST /api/questionBankQuestion/list/page */
export async function listQuestionBankQuestionByPageUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionBankQuestion_>('/api/questionBankQuestion/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listQuestionBankQuestionVOByPage POST /api/questionBankQuestion/list/page/vo */
export async function listQuestionBankQuestionVoByPageUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionBankQuestionVO_>(
    '/api/questionBankQuestion/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** listMyQuestionBankQuestionVOByPage POST /api/questionBankQuestion/my/list/page/vo */
export async function listMyQuestionBankQuestionVoByPageUsingPost(
  body: API.QuestionBankQuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionBankQuestionVO_>(
    '/api/questionBankQuestion/my/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** removeQuestionBankQuestion POST /api/questionBankQuestion/remove */
export async function removeQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionRemoveRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBankQuestion/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateQuestionBankQuestion POST /api/questionBankQuestion/update */
export async function updateQuestionBankQuestionUsingPost(
  body: API.QuestionBankQuestionUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/questionBankQuestion/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
