---
title: ElasticSearch 部署
date: 2023-06-09
order: 41
---

# ElasticSearch 安装部署

## Docker 安装

1. 拉取镜像

```bash
docker pull elasticsearch:7.17.7
```

2. 创建网络（方便与其他组件例如 kibana 连接）

```bash
docker network create elastic
```

3. 启动 ElasticSearch 容器 (单节点模式)

（可选）挂载 `elasticsearch.yml`、数据目录、插件目录到宿主机，需要先在宿主机目录创建该文件，文件内容为：

```yaml
# 表示允许所有主机访问
network.host: 0.0.0.0
# 关闭安全模块（8.x 版本才添加）
xpack.security.enabled: false
xpack.security.enrollment.enabled: false
xpack.security.http.ssl.enabled: false
xpack.security.transport.ssl.enabled: false
```

::: code-tabs
@tab 多行命令
```bash
docker run -d\ 
   --name elasticsearch\ 
   --net elastic\ 
   -p 9200:9200 -p 9300:9300\ 
   -e "discovery.type=single-node"\ 
   -v D:/Docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml\ 
   -v D:/Docker/elasticsearch/data:/usr/share/elasticsearch/data\ 
   -v D:/Docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins\ 
   elasticsearch:7.17.7  
```

@tab 单行命令
```bash
# 不挂载
docker run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms512m -Xmx512m" elasticsearch:7.17.7

# 挂载
docker run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -v D:/Docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v D:/Docker/elasticsearch/data:/usr/share/elasticsearch/data -v D:/Docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins elasticsearch:7.17.7
```
:::

:::tip
直接启动 es 时，大概会占用宿主机 4G 的内存，可以通过指定 docker 容器的内存限制来减少 es 实例的内存开销，适用于开发环境：

```bash
-e ES_JAVA_OPTS="-Xms512m -Xmx512m"
```
:::


4. 测试安装是否成功

打开 `http://localhost:9200/`，替换为实际 ip，如果出现以下结果则表示安装成功：

```json
{
    "name": "f62e736ae7b6",
    "cluster_name": "elasticsearch",
    "cluster_uuid": "diScjh5mT3O6q6w08euNjA",
    "version": {
        "number": "7.17.7",
        "build_flavor": "default",
        "build_type": "docker",
        "build_hash": "c01029875a091076ed42cdb3a41c10b1a9a5a20f",
        "build_date": "2023-05-23T17:16:07.179039820Z",
        "build_snapshot": false,
        "lucene_version": "9.6.0",
        "minimum_wire_compatibility_version": "7.17.0",
        "minimum_index_compatibility_version": "7.0.0"
    },
    "tagline": "You Know, for Search"
}
```

## 安装 ik 分词插件

[elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik) 是一个 elasticsearch 分词插件，由于 es 对中文分词的支持并不完善，通常，我们会使用它来支持更好的中文分词。

安装 ik 有两种方式：

1. 本地安装

在 elasticsearch 工作目录的 plugins 文件夹下面新建文件夹 ik，从这里下载：[ClickHere](https://github.com/medcl/elasticsearch-analysis-ik/releases) 下载对应版本的压缩包，并解压到 ik 文件夹下，注意版本到对应，版本对应关系如下：

![ik 版本](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/1686302638366.png)

2. URL 安装

直接用 `elasticsearch-plugin install` 命令从网络下载并安装，示例：

```bash
# 进入容器
 docker exec -it container_id bash

# 安装 ik 插件
/usr/share/elasticsearch/bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.7/elasticsearch-analysis-ik-7.17.7.zip
```

:::tip
安装完成后，都需要重启 ElasticSearch
:::

## 浏览器插件

在浏览器中有一个插件 `ES-client`，可以很方便的从网页查看 es 的索引、数据等等，在浏览器扩展商店搜索 `ES-client` 即可，使用效果如下：

![](https://cdn.jsdelivr.net/gh/AlexChen68/OSS@master/images/2023/1686308053401.png)

## Docker 安装 kibana

kibana 也是 elastic 公司的产品，Kibana 能够以图表的形式呈现数据，并且具有可扩展的用户界面，可以全方位的配置和管理 ElasticSearch。

这里还是介绍 Docker 安装 Kibana 的步骤：

1. 拉取镜像，注意与 ElasticSearch 版本一致

```bash
docker pull kibana:7.17.7
```

2. 启动容器，连接 ElasticSearch 的网络组

```bash
docker run -d --name kibana --net elastic -p 5601:5601 kibana:7.17.7
```