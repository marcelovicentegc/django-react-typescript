server {

    server_name example.com www.example.com;

    client_max_body_size 2M;

    gzip on;
    gzip_types      text/plain application/json application/xml;
    gzip_proxied    no-cache no-store private expired auth;
    gzip_min_length 1000;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8000;
    }
}