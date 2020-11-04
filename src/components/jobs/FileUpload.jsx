import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useState } from 'react';

export default function FileUpload({ label, onChange }) {
  
  const [mFileList, setFileList] = useState([]);

  const mimeToExtension = {
    ['.doc']: '.doc',
    ['application/msword']: '.doc',
    ['.docx']: '.docx',
    ['application/pdf']: '.pdf',
    ['image/jpeg']: '.jpg',
    ['image/png']: '.png',
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const props = {
    name: 'file',
    fileList: mFileList,
    multiple: false,
    accept: '.doc,.docx,application/msword,application/pdf,image/jpeg,image/png',
    beforeUpload(file, fileList) {
      if (file && file.size > 5 * 1024 * 1024) {
        message.error('File size too large. Kindly shrink the file before uploading or try a different file format.');
        setFileList([]);
      } else {
        setFileList(fileList);
        (async () => {
          const dataUrl = await convertFileToBase64(file);
          const mimeType = dataUrl.substring(dataUrl.indexOf(':') + 1, dataUrl.indexOf(';'));
          onChange(dataUrl, mimeType, mimeToExtension[mimeType]);
        })();
      }
      return false;
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>{label}</Button>
    </Upload>
  );
}
