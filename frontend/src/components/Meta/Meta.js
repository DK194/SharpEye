import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: 'Sharp Eye | Face Detection App',
  description: 'Sharp Eye - Face Detection App',
  keywords: 'face, faces, detection, face detection, face recognition'
}

export default Meta;
