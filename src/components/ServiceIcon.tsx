import React from 'react';
import {
  FileCheck,
  Send,
  FileText,
  HelpCircle,
  Layers,
  Truck,
  Anchor,
  Compass,
  ShieldCheck,
  Globe,
  Ship,
  FileCheck2,
  GitMerge,
  LucideProps,
} from 'lucide-react';

interface ServiceIconProps extends LucideProps {
  name: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'FileCheck':
      return <FileCheck {...props} />;
    case 'Send':
      return <Send {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'HelpCircle':
      return <HelpCircle {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Truck':
      return <Truck {...props} />;
    case 'Anchor':
      return <Anchor {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Globe':
      return <Globe {...props} />;
    case 'Ship':
      return <Ship {...props} />;
    case 'FileCheck2':
      return <FileCheck2 {...props} />;
    case 'GitMerge':
      return <GitMerge {...props} />;
    default:
      return <Anchor {...props} />;
  }
};
