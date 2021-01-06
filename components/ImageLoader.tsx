// @flow

import React, { ReactNode } from "react";


type Props = {
  src: string,
  style: any,
  className?: string,
  alt?: string,
  onLoad?: (img: any) => void,
  onError?: (err: Event) => void,
  image?: (opt: any) => ReactNode,
  loading?: () => ReactNode,
  error?: (err: Event) => ReactNode
}

type State = {
  isLoading: boolean,
  isError: boolean,
  src?:string,
  width?: number,
  height?: number,
  errMsg?: any,
}

export default class ImageLoader extends React.PureComponent<Props, State> {
  state = {
    isLoading: true,
    isError: false,
    src: null,
    width: null,
    height: null,
    errMsg: null
  }

  componentWillReceiveProps(nextProps: Props) {
    // reload only when image src is changed.
    if (this.props.src !== nextProps.src)
      this.reload(nextProps);
  }

  componentDidMount() {
    this.reload(this.props);
  }

  reload = (props: Props) => {
    // initialize
    this.setState({
      isLoading: true,
      isError: false,
      src: null,
      errMsg: null
    });

    const image = new Image();

    image.src = props.src;
    image.onload = () => {
      this.setState({
        src: image.src,
        width: image.width,
        height: image.height,
        isLoading: false,
        isError: false,
        errMsg: null
      });
      if (props.onLoad) {
        props.onLoad(image);
      }
    };
    image.onerror = (err) => {
      this.setState({
        src: null,
        width: null,
        height: null,
        isLoading: false,
        isError: true,
        errMsg: err
      });
      if (props.onError) {
        // @ts-ignore
        props.onError(err);
      }
    }
  }

  render() {
    const {loading, error, image, style, className, alt} = this.props;
    const {src, width, height, isLoading, isError, errMsg} = this.state;
    if (loading && isLoading) {
      return loading();
    } else if (error && isError && errMsg) {
      return error(errMsg);
    } else if (src && image) {
      return image({src, width, height});
    } else if (src) {
      return <img alt={alt || "none"} src={src} style={style} className={className} width={width} height={height}/>
    }

    return null;
  }
}