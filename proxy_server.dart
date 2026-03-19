import 'dart:io';
import 'dart:convert';

/// Simple CORS proxy server to bypass browser CORS restrictions
/// Run this server before running the Flutter web app:
/// dart run proxy_server.dart
void main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('🚀 CORS Proxy Server running on http://localhost:8080');
  print('📝 Use this proxy to bypass CORS when running flutter web app');
  print('');
  
  await for (HttpRequest request in server) {
    // Enable CORS for all origins
    request.response.headers.add('Access-Control-Allow-Origin', '*');
    request.response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    request.response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    
    // Handle preflight OPTIONS request
    if (request.method == 'OPTIONS') {
      request.response.statusCode = HttpStatus.ok;
      await request.response.close();
      continue;
    }
    
    try {
      // Extract target URL from path (format: /http://example.com or /https://example.com)
      final path = request.uri.path;
      
      if (path == '/' || path.isEmpty) {
        request.response.statusCode = HttpStatus.badRequest;
        request.response.write('Usage: http://localhost:8080/https://api.example.com/path');
        await request.response.close();
        continue;
      }
      
      // Remove leading slash and construct target URL
      final targetUrl = path.substring(1);
      
      // Preserve query parameters from original request
      String fullUrl = targetUrl;
      if (request.uri.query.isNotEmpty) {
        fullUrl += '?${request.uri.query}';
      }
      
      print('📡 Proxying request to: $fullUrl');
      
      // Create HTTP client
      final client = HttpClient();
      final uri = Uri.parse(fullUrl);
      
      // Forward the request with the same method
      HttpClientRequest proxyRequest;
      if (request.method == 'GET') {
        proxyRequest = await client.getUrl(uri);
      } else if (request.method == 'POST') {
        proxyRequest = await client.postUrl(uri);
      } else if (request.method == 'PUT') {
        proxyRequest = await client.putUrl(uri);
      } else if (request.method == 'DELETE') {
        proxyRequest = await client.deleteUrl(uri);
      } else {
        proxyRequest = await client.openUrl(request.method, uri);
      }
      
      // Copy request headers (except host)
      request.headers.forEach((name, values) {
        if (name.toLowerCase() != 'host') {
          for (var value in values) {
            proxyRequest.headers.add(name, value);
          }
        }
      });
      
      final proxyResponse = await proxyRequest.close();
      
      // Copy status code
      request.response.statusCode = proxyResponse.statusCode;
      
      // Copy response headers (except CORS headers which we already set)
      proxyResponse.headers.forEach((name, values) {
        if (!name.toLowerCase().startsWith('access-control')) {
          for (var value in values) {
            request.response.headers.add(name, value);
          }
        }
      });
      
      // Stream the response body
      await proxyResponse.pipe(request.response);
      
      client.close();
      
      print('✅ Request completed successfully');
      
    } catch (e, stackTrace) {
      print('❌ Error: $e');
      print('Stack trace: $stackTrace');
      request.response.statusCode = HttpStatus.internalServerError;
      request.response.write('Proxy error: $e');
      await request.response.close();
    }
  }
}
