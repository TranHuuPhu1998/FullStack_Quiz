import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { EyeOutlined } from '@ant-design/icons';
import { ButtonWithIconProps } from './ButtonWithIconProps';
import PropTypes from 'prop-types';

const ViewButton: React.FC<ButtonWithIconProps> = ({ showIcon, danger, minimal, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Button type='default' {...rest} icon={showIcon ? <EyeOutlined /> : null} >
      {minimal ? undefined : t('view')}
    </Button>
  );
};

ViewButton.propTypes = {
  showIcon: PropTypes.bool
};

export default ViewButton;
