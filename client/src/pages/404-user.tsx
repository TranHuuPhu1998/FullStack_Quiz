import { Button, Result } from 'antd';
import { URL_PAGE_USER } from 'app-constants';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Result
      style={{ height: 'calc(100vh - 189px)' }}
      status={'404'}
      title={t('User_not_found')}
      extra={
        <>
          <Button type="primary" onClick={() => history.push(URL_PAGE_USER.COURSES)}>
            {t('Go_Home')}
          </Button>
          <Button type="primary" onClick={() => history.push(URL_PAGE_USER.COURSES)}>
            {t('Contact_us')}
          </Button>
        </>
      }
    ></Result>
  );
};

export default NotFoundPage;
