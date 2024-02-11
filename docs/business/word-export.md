---
title: SpringBoot 导出 word
date: 2024-02-11
order: 1
---

# SpringBoot 导出 word

## 后端导出接口

```java
@ApiOperation(value = "export report", notes = "export report")
@PostMapping(value = "/export")
public void export(@RequestBody ReportQuery query,
                    HttpServletResponse response) {
    if (query.getTaskId() == null) {
        throw new IllegalArgumentException("taskId is null");
    }
    OutputStream outputStream = null;
    try {
        String fileName = reportService.saveReportRecord(query.getTaskId());
        response.reset();
        response.setHeader("Content-disposition", "attachment;filename=" + fileName);
        response.setContentType("application/octet-stream");
//            response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=UTF-8");
        XWPFDocument document = reportService.generateWordXWPFDocument(query, response);
        outputStream = new BufferedOutputStream(response.getOutputStream());
        document.write(outputStream);
        outputStream.flush();
    } catch (IOException e) {
        log.error("export report error", e);
    } finally {
        if (null != outputStream) {
            try {
                outputStream.close();
            } catch (IOException e) {
                log.error("close stream error", e);
            }
        }
    }
}
```

关键代码：

1. 设置 `response` 的数据类型

```java
response.setHeader("Content-disposition", "attachment;filename=" + fileName);
response.setContentType("application/octet-stream");
```

:::tip 
1. `attachment` 表示浏览器自动下载
2. `filename` 指定文件名称
:::

2. 获取输出流

```java
outputStream = new BufferedOutputStream(response.getOutputStream());
```

3. 将 `XWPFDocument` 写入输出流中

```java
XWPFDocument document = reportService.generateWordXWPFDocument(query, response);
document.write(outputStream);
```

## 前端自动下载文件

```typescript
const onExport = () => {
    setProgress(0);
    try {
      const taskId = Date.now();
      const params = {
        taskId,
        ...form.getFieldsValue(),
      };
      $http
        .post('/report/export', params, {
          responseType: 'blob',
        })
        .then((blob: any) => {
          const fileName = 'report_' + taskId + '.docx';
          const url = URL.createObjectURL(
            new Blob([blob], {
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            })
          );
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
        });

      const intervalId = setInterval(() => {
        $http
          .get('/report/progress', {
            taskId,
          })
          .then((res: any) => {
            if (res === 1) {
              message.success(intl.formatMessage({ id: 'common_export_fail' }));
              clearInterval(intervalId);
            }
            setProgress(res);
            if (res === 100) {
              message.success(
                intl.formatMessage({ id: 'common_export_success' })
              );
              clearInterval(intervalId);
            }
          })
          .catch(() => {
            message.success(intl.formatMessage({ id: 'common_export_fail' }));
            clearInterval(intervalId);
          });
      }, 1000);
    } catch (error) {}
};
```

关键代码：

1. 请求后端接口，以 `blob` 二进制流返回，根据自己封装的 `request` 工具而定，获取到 blob 二进制流数据

```js
$http.post('/report/export', params, {
    responseType: 'blob',
})
```

2. 创建一个 URL

```js
const url = URL.createObjectURL(
    new Blob([blob], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
);
```

3. 创建一个隐藏 `<a>` 标签元素，并模拟点击操作，下载文件后再移除该标签

```js
const link = document.createElement('a');
link.style.display = 'none';
link.href = url;
link.setAttribute('download', fileName);
document.body.appendChild(link);
link.click();
URL.revokeObjectURL(url);
```

## 导出进度条实现

前端：

1. 发送一个请求到后端开始导出过程。这个请求应该包含所有必要的信息，如导出的数据类型、范围等。
2. 启动一个定时器，每隔一段时间（例如，每秒）向后端发送一个请求，询问导出进度。
3. 收到后端的进度更新后，更新前端的进度条。
4. 当后端报告导出完成时，停止定时器，并下载导出的文件。

后端：

1. 收到前端的导出请求后，开始导出过程。这可能涉及到一些耗时的操作，如查询数据库、处理数据等。
2. 将导出进度存储在某个地方，如数据库或内存中。进度可以是已处理的数据项数量、已完成的百分比等。
3. 当收到前端的进度查询请求时，返回当前的导出进度。
4. 当导出完成时，将导出的文件存储在某个地方，如服务器的文件系统或云存储中，并返回一个可以下载该文件的 URL。