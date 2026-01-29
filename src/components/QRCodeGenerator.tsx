import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
}

export const QRCodeGenerator = ({ url, size = 200 }: QRCodeGeneratorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg inline-block"
    >
      <QRCodeSVG
        value={url}
        size={size}
        level="H"
        includeMargin={true}
        bgColor="#ffffff"
        fgColor="#111827"
      />
      <p className="text-center text-sm text-muted-foreground mt-4 max-w-[200px]">
        Escaneie para acessar no celular
      </p>
    </motion.div>
  );
};
