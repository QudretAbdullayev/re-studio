import Image from "next/image";

const SafeImage = ({ src, alt, ...rest }) => {
    if (!src || typeof src !== 'string' || src.trim() === '') {
        return null;
    }

    return <Image src={src} alt={alt || ''} {...rest} />;
}

export default SafeImage