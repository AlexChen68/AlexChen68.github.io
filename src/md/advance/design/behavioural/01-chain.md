---
title: 责任链模式
category: 设计模式
date: 2022-09-27
---

责任链模式 (Chain of responsibility pattern): 通过责任链模式，你可以为某个请求创建一个对象链。每个对象依序检查此请求并对其进行处理或者将它传给链中的下一个对象。
<!-- more -->

## 责任链模式 (Chain of responsibility pattern)

> 责任链模式 (Chain of Responsibility Pattern)：避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。责任链模式是一种对象行为型模式。

## 类图

![责任链模式类图](https://cdn.staticaly.com/gh/AlexChen68/images@master/blog/advance/chain_of_responsibility_pattern.png)

在责任链模式类图中包含如下几个角色：

- Handler（抽象处理者）

  它定义了一个处理请求的接口，一般设计为抽象类，由于不同的具体处理者处理请求的方式不同，因此在其中定义了抽象请求处理方法。因为每一个处理者的下家还是一个处理者，因此在抽象处理者中定义了一个抽象处理者类型的对象（如类图中的 successor），作为其对下家的引用。通过该引用，处理者可以连成一条链。

- ConcreteHandler（具体处理者）

它是抽象处理者的子类，可以处理用户请求，在具体处理者类中实现了抽象处理者中定义的抽象请求处理方法，在处理请求之前需要进行判断，看是否有相应的处理权限，如果可以处理请求就处理它，否则将请求转发给后继者；在具体处理者中可以访问链中下一个对象，以便请求的转发。

## 伪代码

先定义一个抽象的处理者，它持有下一个处理者的引用

```java
public abstract class Handler {
    // 持有下一个处理者的引用
    protected Handler successor;

    public Handler(Handler successor) {
        this.successor = successor;
    }

    protected abstract void handleRequest(Request request);

    protected void successorHandleRequest(Request request) {
        if (successor != null) {
            successor.handleRequest(request);
        }
    }
}
```

再定义两个具体处理者

```java
public class FirstHandler extends Handler {

    public FirstHandler(Handler successor) {
        super(successor);
    }

    @Override
    protected void handleRequest(Request request) {
        System.out.println("FirstHandler");
        successorHandleRequest(request);
    }
}

public class SecondHandler extends Handler {

    public SecondHandler(Handler successor) {
        super(successor);
    }

    @Override
    protected void handleRequest(Request request) {
        System.out.println("SecondHandler");
        successorHandleRequest(request);
    }
}

// Request 信息
@Data
public class Request {

    String name;
    String info;
}
```

客户端调用

```java
public class Client {
    public static void main(String[] args) {
        SecondHandler secondHandler = new SecondHandler(null);
        FirstHandler firstHandler = new FirstHandler(secondHandler);

        firstHandler.handleRequest(new Request());
    }
}

// 结果

FirstHandler
SecondHandler
```

## 改进的责任链模式

上面这种结构的责任链有一个缺点是，在创建的时候，需要按照顺序创建并且有依赖关系，而且一个处理者处理完后，不能再根据后续处理者的处理结果进行判断处理；

在 `javax.servlet` 中，通过引入 `FilterChain` 过滤器链，处理请求的 `Filter` 既可以在请求到来时进行过滤处理，也可以在后续过滤器进行处理后，再返回到该过滤器对服务器返回的结果进行二次处理；此外，在 Spring 框架中，还依靠 Spring 的自动注入和 `@Order` 注解，自动寻找 `Filter` 的子类注入 `FilterChain` 中，让创建和使用分离，无需太关心创建过程。

我们来实现一个包含 `FilterChain` 的责任链

```java
public interface Filter {

    void doFilter(Request request, Response response, FilterChain chain);
}

public class FilterChain {

    private List<Filter> filters = new CopyOnWriteArrayList();
    private int index = 0;

    public FilterChain() {}

    public FilterChain add(Filter filter) {
        if (filter == null) {
            throw new RuntimeException("Filter invalid");
        }
        filters.add(filter);
        return this;
    }

    public void doFilter(Request request, Response response) {
        if (index >= filters.size()) {
            return;
        }
        Filter filter = filters.get(index);
        index++;
        filter.doFilter(request, response, this);
    }
}

// Request 和 Response 为请求信息和返回信息的封装类，这里仅简单演示，不包含什么信息
public class Request {

    String info;
}
public class Response {

    String info;
}
```

再创建两个具体的 `Filter`

```java
public class URLFilter implements Filter {

    @Override
    public void doFilter(Request request, Response response, FilterChain chain) {
        System.out.println("Before URLFilter");
        chain.doFilter(request, response);
        System.out.println("After URLFilter");
    }
}

public class SensitiveFilter implements Filter {

    @Override
    public void doFilter(Request request, Response response, FilterChain chain) {
        System.out.println("Before SensitiveFilter");
        chain.doFilter(request, response);
        System.out.println("After SensitiveFilter");
    }
}
```

增加一个 `FilterChainFactory` 用来创建 `FilterChain`，这里我们直接使用 `new` 来创建 `Filter`

```java
public class FilterChainFactory {

    public static FilterChain createFilterChain() {
        FilterChain chain = new FilterChain();
        chain.add(new URLFilter());
        chain.add(new SensitiveFilter());
        return chain;
    }
}
```

最后是客户端调用

```java
public class Client {

    public static void main(String[] args) {
        FilterChain filterChain = new FilterChain();
        Request request = new Request();
        Response response = new Response();
        filterChain.doFilter(request, response);
    }
}
```

执行结果

```java
Before URLFilter
Before SensitiveFilter
After SensitiveFilter
After URLFilter
```

从上述代码可以看到，`FilterChain` 包含了一个 `Filter` 的列表，其内部维护了一个索引，用来决定下一个调用哪个过滤器的 `doFilter()`；

而在具体的 `Filter` 实现类中，可用通过 `chain.doFilter(request, response)` 调用 `FilterChain` 的 `doFilter()` 来执行下一个过滤器的过滤逻辑，依次类推；这同样意味着，如果不调用 `FilterChain` 的 `doFilter()`，那么后续的过滤器则不会执行了，但是前面的过滤器在 `chain.doFilter(request, response)` 之后的代码依旧会执行。

## 应用实例

最经典的 `javax.servlet` 的过滤器链，上述改进的责任链模式即是其简化后的代码。

## 总结

责任链模式通过建立一条链来组织请求的处理者，请求将沿着链进行传递，请求发送者无须知道请求在何时、何处以及如何被处理，实现了请求发送者与处理者的解耦。

在软件开发中，如果遇到有多个对象可以处理同一请求时可以应用责任链模式，例如在 Web 应用开发中创建一个过滤器 (Filter) 链来对请求数据进行过滤，在工作流系统中实现公文的分级审批等等，使用责任链模式可以较好地解决此类问题。

### 适用场景

- 有多个对象可以处理同一个请求，具体哪个对象处理该请求待运行时刻再确定，客户端只需将请求提交到链上，而无须关心请求的处理对象是谁以及它是如何处理的。
- 在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。
- 可动态指定一组对象处理请求，客户端可以动态创建责任链来处理请求，还可以改变链中处理者之间的先后次序。

## 参考资料

- [字节飞扬](https://bytesfly.github.io/blog/#/DesignPattern/chain-of-responsibility-pattern)
- [马士兵](https://github.com/bjmashibing/DesignPatterns/blob/master/src/main/java/com/mashibing/dp/cor/servlet/v4/Servlet_Main.java)
- [Java 全栈知识体系](https://pdai.tech/md/dev-spec/pattern/15_chain.html)