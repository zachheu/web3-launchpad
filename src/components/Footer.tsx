import { motion } from 'framer-motion';
import { Shield, Github, Twitter, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="border-t border-border/50 mt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-display font-bold gradient-text">TrustScore</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg bg-muted/30 text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 TrustScore. All rights reserved.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            TrustScore is a decentralized wallet reputation protocol. All data is fetched directly from 
            blockchain networks. This is not financial advice. Always DYOR before transacting.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
