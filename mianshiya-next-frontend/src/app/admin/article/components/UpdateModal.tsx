"use client";
import { updateArticleUsingPost } from "@/api/articleController";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import MdEditor from "@/components/MdEditor";
import TagList from "@/components/TagList";

interface Props {
  visible: boolean;
  data: API.Article;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * 更新文章弹窗
 *
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { visible, data, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && visible) {
      form.setFieldsValue({
        ...data,
        tags: data.tags ? JSON.parse(data.tags) : [],
      });
    }
  }, [data, visible]);

  /**
   * 提交
   */
  const doSubmit = async (values: API.ArticleUpdateRequest) => {
    setLoading(true);
    try {
      const res = await updateArticleUsingPost({
        id: data.id,
        ...values,
      });
      if (res.data) {
        message.success("更新成功");
        onSubmit();
      }
    } catch (error: any) {
      message.error("更新失败：" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="更新文章"
      open={visible}
      width={800}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
          更新
        </Button>,
      ]}
      destroyOnClose
      style={{ zIndex: 1050 }}
      maskClosable={!loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={doSubmit}
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: "请输入文章标题" }]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>

        <Form.Item
          label="文章摘要"
          name="summary"
          rules={[{ max: 500, message: "摘要不能超过500字" }]}
        >
          <Input.TextArea
            placeholder="请输入文章摘要（可选）"
            rows={3}
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          label="封面图片"
          name="cover"
        >
          <Input placeholder="请输入封面图片URL（可选）" />
        </Form.Item>

        <Form.Item
          label="文章分类"
          name="category"
        >
          <Select
            placeholder="请选择文章分类"
            options={[
              { label: "技术分享", value: "技术分享" },
              { label: "面试经验", value: "面试经验" },
              { label: "职场生活", value: "职场生活" },
              { label: "学习笔记", value: "学习笔记" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="文章标签"
          name="tags"
        >
          <TagList editable placeholder="请选择或输入文章标签" />
        </Form.Item>

        <Form.Item
          label="发布状态"
          name="status"
          rules={[{ required: true, message: "请选择发布状态" }]}
        >
          <Select
            options={[
              { label: "草稿", value: 0 },
              { label: "发布", value: 1 },
              { label: "下线", value: 2 },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="文章内容"
          name="content"
          rules={[{ required: true, message: "请输入文章内容" }]}
        >
          <MdEditor />
        </Form.Item>


      </Form>
    </Modal>
  );
};

export default UpdateModal;
