import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const html = `
  <html>
    <head>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: black;
        }
        canvas {
          display: block;
        }
      </style>
    </head>
    <body>
      <canvas id="starCanvas"></canvas>
      <script>
        const canvas = document.getElementById("starCanvas");
        const ctx = canvas.getContext("2d");
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const numStars = 150;
        const stars = [];
        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.2 + 0.05
          });
        }

        function drawStars() {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = "white";
          for (const star of stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.x += star.speed;
            if (star.x > width) {
              star.x = 0;
              star.y = Math.random() * height;
            }
          }
        }

        function animate() {
          drawStars();
          requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener("resize", () => {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
        });
      </script>
    </body>
  </html>
`;

export default function StarrySkyBG() {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={StyleSheet.absoluteFill}
        scrollEnabled={false}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
});
