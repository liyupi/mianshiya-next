"use client";
import { Modal, Form, Input, Select, message } from "antd";
import { editArticleUsingPost } from "@/api/articleController";
import MdEditor from "@/components/MdEditor";
import { useState, useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  visible: boolean;
  values: Partial<API.Article>;
  onCancel: () => void;
  onSuccess: () => void;
}

/**
 * 编辑文章弹窗
 * @param visible 是否可见
 * @param values 文章数据
 * @param onCancel 取消回调
 * @param onSuccess 成功回调
 * @constructor
 */
const UpdateModal: React.FC<Props> = ({ visible, values, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 当弹窗打开时，设置表单初始值
  useEffect(() => {
    if (visible && values) {
      form.setFieldsValue({
        ...values,
        tags: values.tags ? values.tags.split(",") : [],
      });
    }
  }, [visible, values, form]);

  /**
   * 提交
   * @param formValues
   */
  const doSubmit = async (formValues: API.ArticleEditRequest) => {
    const hide = message.loading("正在操作");
    setLoading(true);
    try {
      await editArticleUsingPost({
        ...formValues,
        id: values.id,
      });
      hide();
      message.success("操作成功");
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      hide();
      message.error("操作失败，" + error.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      title="编辑文章"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={doSubmit}>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>

        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: "请选择分类" }]}
        >
          <Select placeholder="请选择分类">
            <Option value="技术">技术</Option>
            <Option value="面试">面试</Option>
            <Option value="经验">经验</Option>
            <Option value="教程">教程</Option>
            <Option value="其他">其他</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="摘要"
          name="summary"
          rules={[{ required: true, message: "请输入摘要" }]}
        >
          <TextArea
            placeholder="请输入文章摘要"
            rows={3}
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="标签"
          name="tags"
          rules={[{ required: true, message: "请输入标签" }]}
        >
          <Select
            mode="tags"
            placeholder="请输入标签，按回车确认"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: "请输入内容" }]}
        >
          <MdEditor />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
