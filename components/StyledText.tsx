import { DefaultText, TextProps } from './UI/Themed';

export function MonoText(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
