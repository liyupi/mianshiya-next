"use client";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import { TablePaginationConfig } from "antd";
import Link from "next/link";
import "./index.css";

interface Props {
  // 默认值（用于展示服务端渲染的数据）
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  // 默认搜索条件
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const actionRef = useRef<ActionType>();
  // 题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  // 题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // 用于判断是否首次加载
  const [init, setInit] = useState<boolean>(true);

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        return <TagList tagList={record.tagList} />;
      },
    },
  ];

  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 首次请求
          if (init) {
            setInit(false);
            // 如果已有外层传来的默认数据，无需再次查询
            if (defaultQuestionList && defaultTotal) {
              return;
            }
          }

          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";

          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          // 更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          // 更新状态
          setQuestionList(newData);
          setTotal(newTotal);

          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;