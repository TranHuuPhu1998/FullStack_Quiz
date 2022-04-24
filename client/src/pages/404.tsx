import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Result
      status={'404'}
      title={t('RESOURCES.COMMON.NOT_FOUND_TITLE')}
      subTitle={t('RESOURCES.COMMON.NOT_FOUND_DESCRIPTION')}
      extra={
        <Button type="primary">
          {t('RESOURCES.COMMON.GO_HOME')}
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
