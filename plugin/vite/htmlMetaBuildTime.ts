import type { Plugin } from 'vite';

import dayjs from 'dayjs';

/**
 * 在 html 中插入一个名为 buildTime 标签，放置运行 serve、build 的时间
 */
function htmlMetaBuildTime(): Plugin {
  const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  return {
    name: 'html-meta-build-time',
    transformIndexHtml(html: string) {
      return {
        html,
        tags: [
          {
            tag: 'meta',
            attrs: { name: 'buildTime', content: buildTime },
            injectTo: 'head',
          },
        ],
      };
    },
  };
}

export default htmlMetaBuildTime;
