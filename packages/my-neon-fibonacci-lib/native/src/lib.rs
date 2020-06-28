use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 1,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn fibonacci_bind(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let x = cx.argument::<JsNumber>(0)?.value();
    Ok(
        cx.number(fibonacci(x as u32) as f64)
    )
}

register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("fibonacci", fibonacci_bind)?;
    Ok(())
});
