"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import {
  batchDeleteArticlesUsingPost,
  deleteArticleUsingPost,
  listArticleByPageUsingPost,
} from "@/api/articleController";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Table, Typography } from "antd";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";
import "./index.css";

const { Text } = Typography;

/**
 * 文章管理页面
 * @constructor
 */
const ArticleAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Article>();
  const actionRef = useRef<ActionType>();

  /**
   * 删除文章
   * @param selectedRows
   */
  const doDelete = async (selectedRows: API.Article[]) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;
    try {
      await batchDeleteArticlesUsingPost({
        ids: selectedRows.map((row) => row.id),
      });
      hide();
      message.success("删除成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };

  /**
   * 删除单篇文章
   * @param record
   */
  const doDeleteOne = async (record: API.Article) => {
    const hide = message.loading("正在删除");
    try {
      await deleteArticleUsingPost({
        id: record.id,
      });
      hide();
      message.success("删除成功");
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败，" + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.Article>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "index",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
      tip: "标题过长会自动收缩",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "textarea",
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "摘要",
      dataIndex: "summary",
      valueType: "textarea",
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "分类",
      dataIndex: "category",
      valueType: "select",
      valueEnum: {
        技术: { text: "技术" },
        面试: { text: "面试" },
        经验: { text: "经验" },
        教程: { text: "教程" },
        其他: { text: "其他" },
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => <TagList tagList={record.tags?.split(",") || []} />,
    },
    {
      title: "浏览量",
      dataIndex: "viewCount",
      valueType: "digit",
      hideInSearch: true,
    },
    {
      title: "点赞数",
      dataIndex: "thumbNum",
      valueType: "digit",
      hideInSearch: true,
    },
    {
      title: "收藏数",
      dataIndex: "favourNum",
      valueType: "digit",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRow(record);
            setUpdateModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除吗？"
          onConfirm={() => doDeleteOne(record)}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Article>
        headerTitle="文章管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const res = await listArticleByPageUsingPost({
            ...params,
            sortField: sort?.createTime,
            sortOrder: sort?.createTime === "ascend" ? "ascend" : "descend",
          });
          return {
            data: res.data?.records || [],
            success: true,
            total: res.data?.total || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            // 处理多选
          },
        }}
      />
      <CreateModal
        visible={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
        onSuccess={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        values={currentRow || {}}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        onSuccess={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default ArticleAdminPage;
