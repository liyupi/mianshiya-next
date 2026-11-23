"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import { deleteArticleUsingPost, listArticleByPageUsingPost } from "@/api/articleController";
import { Button, message, Space, Table, Tag, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./index.css";

/**
 * 文章管理页面
 *
 * @constructor
 */
const ArticleAdminPage: React.FC = () => {
  const [dataList, setDataList] = useState<API.Article[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<API.Article>({});

  /**
   * 加载数据
   */
  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listArticleByPageUsingPost({
        current,
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setDataList(res.data?.records || []);
      setTotal(res.data?.total || 0);
    } catch (error: any) {
      message.error("加载失败：" + error.message);
    }
    setLoading(false);
  };

  /**
   * 删除
   */
  const doDelete = async (id: number) => {
    try {
      await deleteArticleUsingPost({ id });
      message.success("删除成功");
      loadData();
    } catch (error: any) {
      message.error("删除失败：" + error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 表格列配置
   */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (text: string) => (
        <div style={{ 
          maxWidth: 180, 
          overflow: "hidden", 
          textOverflow: "ellipsis", 
          whiteSpace: "nowrap" 
        }}>
          {text}
        </div>
      ),
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (text: string) => text ? <Tag color="blue">{text}</Tag> : "-",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: number) => {
        const statusMap = {
          0: { text: "草稿", color: "default" },
          1: { text: "已发布", color: "green" },
          2: { text: "已下线", color: "red" },
        };
        const config = statusMap[status as keyof typeof statusMap] || { text: "未知", color: "default" };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "统计",
      key: "stats",
      width: 150,
      render: (record: API.Article) => (
        <div className="article-stats">
          <div>阅读: {record.viewNum || 0}</div>
          <div>点赞: {record.thumbNum || 0}</div>
          <div>收藏: {record.favourNum || 0}</div>
        </div>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 180,
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (record: API.Article) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setUpdateData(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="确认删除这篇文章吗？"
            onConfirm={() => doDelete(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div id="articleAdminPage">
      <div className="page-header">
        <h2>文章管理</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          创建文章
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataList}
        rowKey="id"
        pagination={{
          current: 1,
          pageSize: 10,
          total,
          showTotal: (total) => `总共 ${total} 条`,
          onChange: loadData,
        }}
        loading={loading}
        scroll={{ x: 1000 }}
      />

      <CreateModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          loadData();
        }}
      />

      <UpdateModal
        visible={updateModalVisible}
        data={updateData}
        onCancel={() => setUpdateModalVisible(false)}
        onSubmit={() => {
          setUpdateModalVisible(false);
          loadData();
        }}
      />
    </div>
  );
};

export default ArticleAdminPage;
