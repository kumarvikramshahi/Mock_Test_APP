import { DefaultText, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
