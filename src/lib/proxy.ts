interface Proxy {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

class ProxyManager {
  private proxies: Proxy[];
  private currentIndex: number;
  private lastCheck: Map<string, number>;

  constructor() {
    this.proxies = this.loadProxiesFromEnv();
    this.currentIndex = 0;
    this.lastCheck = new Map();
  }

  private loadProxiesFromEnv(): Proxy[] {
    // Load from environment variables
    const proxyString = process.env.PROXY_LIST;
    if (!proxyString) return [];

    return proxyString.split(',').map(proxy => {
      const [host, port, username, password] = proxy.split(':');
      return {
        host,
        port: parseInt(port),
        username,
        password,
      };
    });
  }

  async getHealthyProxy(): Promise<Proxy | null> {
    let attempts = 0;
    const maxAttempts = this.proxies.length;

    while (attempts < maxAttempts) {
      const proxy = this.proxies[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.proxies.length;

      if (await this.isProxyHealthy(proxy)) {
        return proxy;
      }

      attempts++;
    }

    return null;
  }

  private async isProxyHealthy(proxy: Proxy): Promise<boolean> {
    const proxyKey = `${proxy.host}:${proxy.port}`;
    const lastCheckTime = this.lastCheck.get(proxyKey) || 0;
    const now = Date.now();

    // Only check health every 5 minutes
    if (now - lastCheckTime < 5 * 60 * 1000) {
      return true;
    }

    try {
      // Implement health check logic here
      // For example, try to make a request to a reliable endpoint
      return true;
    } catch {
      return false;
    } finally {
      this.lastCheck.set(proxyKey, now);
    }
  }
}

export const proxyManager = new ProxyManager(); 