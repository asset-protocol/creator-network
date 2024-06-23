import Avatar, { AvatarProps } from 'boring-avatars';
import ReactDOM from 'react-dom';

export type generatAvatarArgs = {
  size?: number;
  name: string;
  variant?: AvatarProps['variant'];
};

const colors = ['#331436', '#7A1745', '#CB4F57', '#EB9961', '#FCF4B6'];

export function generatAvatar(args: generatAvatarArgs) {
  const avatar = (
    <Avatar
      size={args.size}
      name={args.name}
      variant={args.variant ?? "beam"}
      colors={colors}
    />
  );
  return new Promise<string>((resovle, reject) => {
    const div = document.createElement('div');
    ReactDOM.render(avatar, div, () => {
      console.log('avatar div', div.innerHTML);
      const svgNode = div.innerHTML;
      const svgStart = svgNode.indexOf('<svg');
      const svgEnd = svgNode.indexOf('</svg>') + 6;
      const svgResult = svgNode.substring(svgStart, svgEnd).toString();
      resovle(svgResult);
    });
  });
}
