<script>
    import TodoItem from "$lib/todo-item.svelte";

    const title = "Todo";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form>
    <input type="text" name="text" placeholder="+ create a new todo">
</form>

<TodoItem></TodoItem>
<TodoItem></TodoItem>
<TodoItem></TodoItem>
