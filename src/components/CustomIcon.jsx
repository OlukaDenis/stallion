export default function CustomIcon({ imgAlt, imgSrc, srcSetData }) {

  const srcSets = srcSetData ? (
    srcSetData.map((data) => <source key={data.src} srcSet={data.src} type={data.type}></source>)
  ) : (
    <></>
  );

  return (
    <span role="img" aria-label="edit" className="anticon anticon-edit">
      <picture>
        {srcSets}
        <img className="custom-icon-image" alt={imgAlt} src={imgSrc} />
      </picture>
    </span>
  );
}
