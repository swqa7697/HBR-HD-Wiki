import { Card, CardProps } from 'flowbite-react';
import { FC } from 'react';

type CardImg_H_props = CardProps & {
  imgSrc: string;
};

export const CardImg_H: FC<CardImg_H_props> = ({ imgSrc, children }) => {
  return (
    <Card
      renderImage={() => (
        <div className="flex relative items-center justify-center mt-2 md:my-1 md:ml-2 pointer-events-none select-none">
          <img src={imgSrc} alt="Img" className="h-36 object-contain" />
          <div className="absolute inset-0 bg-transparent" />
        </div>
      )}
      className="max-w-sm bg-gradient-to-br from-pink-800/75 from-40% to-pink-800/25 border-0 border-pink-800 hover:shadow-lg"
      horizontal
    >
      {children}
    </Card>
  );
};
