import React from 'react';
import { Row, Col, Card, PageHeader, Typography } from 'antd';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { PageContentBaseProps } from 'interfaces/components/PageContent';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import dateTimeUtils from 'utils/date';
import { nanoid } from 'nanoid';

const { Text } = Typography;

const PageHeaderWithoutPadding = styled(PageHeader)`
  padding: 0 !important;
`;

const CardWithBoxShadow = styled(Card)`
  -webkit-box-shadow: 0px 0px 8px 1px #e2e1e1;
  -moz-box-shadow: 0px 0px 8px 1px #e2e1e1;
  box-shadow: 0px 0px 8px 1px #e2e1e1;
  background: red !important;
`;

const PageContentBase: React.FC<PageContentBaseProps> = ({
  children,
  title,
  subtitle,
  useBack,
  backTo,
  actions,
  aside,
}) => {
  const history = useHistory();
  const backAction = useBack
    ? () => {
        backTo ? history.push(backTo) : history.goBack();
      }
    : undefined;
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]} align="top" justify="space-between">
      {aside ? (
        <>
          <Col xl={18} xxl={18} lg={24} md={24} sm={24} xs={24}>
            <CardWithBoxShadow
              title={
                <PageHeaderWithoutPadding
                  title={title}
                  subTitle={subtitle}
                  onBack={backAction}
                  extra={actions}
                />
              }
              actions={[
                <Text key={nanoid()} type="secondary">
                  {t('RESOURCES.COMMON.DATETIME_HINT', {
                    timeZone: dateTimeUtils.displayedCurrentTimezoneInfo(),
                  })}
                </Text>,
              ]}
            >
              {children}
            </CardWithBoxShadow>
          </Col>
          <Col xl={6} xxl={6} lg={24} md={24} sm={24} xs={24}>
            {aside}
          </Col>
        </>
      ) : (
        <Col span={24}>
          <Card
            title={
              <PageHeaderWithoutPadding
                title={title}
                subTitle={subtitle}
                onBack={backAction}
                extra={actions}
              />
            }
          >
            {children}
          </Card>
        </Col>
      )}
    </Row>
  );
};

PageContentBase.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  useBack: PropTypes.bool,
  backTo: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node),
  aside: PropTypes.node,
};

export default PageContentBase;
