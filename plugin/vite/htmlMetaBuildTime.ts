import dayjs from 'dayjs';
import type { Plugin } from 'vite';

/**
 * 将 html 中 `<meta name="build-time" content="htmlMetaBuildTime" />` 的
 * htmlMetaBuildTime 替换为允许 serve、build 的时间
 */
function htmlMetaBuildTime(): Plugin {
  const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  return {
    name: 'html-meta-build-time',
    transformIndexHtml(html: string) {
      return html.replace(/htmlMetaBuildTime/, buildTime);
    },
  };
}

export default htmlMetaBuildTime;
