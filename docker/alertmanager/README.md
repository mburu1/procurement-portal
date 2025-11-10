How to enable Alertmanager for the local monitoring stack

1. Add an Alertmanager service to your docker-compose (example snippet):

services:
  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    volumes:
      - ./docker/alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml:ro
    ports:
      - 9093:9093

2. Ensure Prometheus is configured to talk to the alertmanager. In `docker/prometheus/prometheus.yml` the `alertmanagers` static_configs should include `alertmanager:9093` (service name) when using docker-compose.

3. Configure receivers in `docker/alertmanager/alertmanager.yml` (email, Slack, PagerDuty, etc.) by uncommenting and filling the appropriate sections.

4. Restart the stack:

```bash
# from repo root
docker compose up -d prometheus alertmanager
```

5. To test alerts quickly, use `amtool` or generate a test alert against Prometheus (or temporarily lower thresholds in `procurement_alerts.yml`).
