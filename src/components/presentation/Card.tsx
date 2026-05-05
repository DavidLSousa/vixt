/** @jsx h */
import { h } from '../../core/dom';
import { Typography } from '../primitives';

export const Card = ({ title, children }: { title: string; children?: any }) => {
  return (
    <div className="card">
      <Typography tag="h3">{title}</Typography>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};
