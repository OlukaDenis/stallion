import Document, { Html, Head, Main, NextScript } from 'next/document';
import PropTypes from 'prop-types';

const i18nPropsFromCtx = (ctx) => {
  if (!(ctx && ctx.req && ctx.req.language)) return {};
  const req = ctx.req;
  return {
    lang: req.language,
    // dir: req.i18n && req.i18n.dir(req.language),
  };
};

class MyDocument extends Document {
  
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const i18nDocumentProps = i18nPropsFromCtx(ctx);
    
    return { ...initialProps, i18nDocumentProps };
  }

  render() {
    const { i18nDocumentProps } = this.props;
    
    return (
      <Html {...i18nDocumentProps} className="no-js webp no-webp">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
