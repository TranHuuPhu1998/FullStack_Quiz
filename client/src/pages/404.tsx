import { Button, Result } from 'antd';
import { URL_PAGE } from 'app-constants';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Result
      style={{ height: 'calc(100vh - 189px)' }}
      status={'404'}
      title={t('Not_found_title')}
      subTitle={t('Not_found_desc')}
      extra={
        <Button type="primary" onClick={() => history.push(URL_PAGE.DASHBOARD)}>
          {t('Go_Home')}
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
