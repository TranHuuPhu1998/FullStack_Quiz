import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Result
      status={'404'}
      title={t('RESOURCES.COMMON.NOT_FOUND_TITLE')}
      subTitle={t('RESOURCES.COMMON.NOT_FOUND_DESCRIPTION')}
      extra={
        <Button type="primary" onClick={() => navigate('/dashboard')}>
          {t('RESOURCES.COMMON.GO_HOME')}
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
