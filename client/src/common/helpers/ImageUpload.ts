export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg'];

  let err = '';
  if (!file) return (err = 'file dose not exist.');

  if (file.size > 1024 * 1024)
    // 1mb
    err = 'The largest image size is 1mb.';

  if (!types.includes(file.type)) err = 'The image type is png / jpeg.';

  return err;
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'xenuumuo');
  formData.append('cloud_name', 'ifv');

  const res = await fetch('https://api.cloudinary.com/v1_1/ifv/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};
